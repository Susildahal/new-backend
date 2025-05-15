// controllers/authController.js
import adminid from "../Models/adminid.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import transporter from "../config/Nodemiller.js";

dotenv.config();


const generateOtp = () => Math.floor(Math.random() * 900000) + 100000;
const otpExpiry = () => Date.now() + 60 * 60 * 1000; // 1 hour

// Create User (Only Superadmin can call this in future)
export const createuser = async (req, res) => {
    const { id, roll, password,name } = req.body;
  
    try {
        if (req.user.roll !== "superadmin") {
            return res.status(403).json({ success: false, msg: "Only superadmin can create users" });
        }

        const existing = await adminid.findOne({ id });
        if (existing) {
            return res.status(400).json({ success: false, msg: "User already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);
        const newUser = new adminid({ id, roll,name, password: hashed });
        await newUser.save();

        res.status(201).json({ success: true, msg: "User created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Internal server error" });
    }
};


// Login (Sends OTP)
export const Login = async (req, res) => {
    const { id, password } = req.body;
 
    if (!id || !password) {
        return res.status(400).json({ success: false, msg: "Please enter all fields" });
    }

    try {
        const user = await adminid.findOne({ id });
        if (!user) {
            return res.status(400).json({ success: false, msg: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, msg: "Incorrect password" });
        }

        const otp = generateOtp();
        user.otp = otp;
        user.otpExpiry = otpExpiry().toString();
        await user.save();

        const mailOptions = {
            from: process.env.SMPT_EMAIL,
            to: id, // assuming id is email
            subject: "Your OTP Code",
            text: `Your OTP is: ${otp}. It will expire in 60 minutes.`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, msg: `OTP sent to your email: ${id}` });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Internal server error" });
    }
};

// Verify OTP and Login
export const checkotptologin = async (req, res) => {
    const { otp, id } = req.body;

    if (!otp || !id) {
        return res.status(400).json({ success: false, msg: "OTP and ID are required" });
    }
    try {
        const user = await adminid.findOne({ id });
        if (!user) {
            return res.status(400).json({ success: false, msg: "Invalid credentials" });
        }

        // Check OTP match
        if (String(user.otp) !== String(otp).trim()) {
            return res.status(400).json({ success: false, msg: "Invalid OTP" });
        }
        

        // Check if OTP is expired
        if (user.otpExpiry < Date.now()) {
            user.otp = null;
            user.otpExpiry = null;
            await user.save();
            return res.status(400).json({ success: false, msg: "OTP has expired" });
        }

        // OTP is valid – clear it and login
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        const token = jwt.sign(
            { id: user._id, roll:user.roll }, // You can add more data here
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "development",
            sameSite: process.env.NODE_ENV === "development" ? "Strict" : "Lax",
            maxAge: 60 * 60 * 1000, // 1 hour
        });

        res.status(200).json({ success: true, msg: "User logged in successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "Internal server error" });
    }
};


// Logout
export const logout = async (req, res) => {
   
    try {

        res.cookie("authToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "development",
            sameSite: process.env.NODE_ENV === "development" ? "Strict" : "Lax",
            expires: new Date(0),
            path: "/"
        });
 
        res.clearCookie("authToken", { path: "/" });
        res.status(200).json({ success: true, msg: "Logout successful!" });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Internal server error" });
    }
};

// Send Password Reset OTP
export const passwordchangeotp = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ msg: "User ID required", success: false });
    }

    try {
        const user = await adminid.findOne({ id });
        if (!user) {
            return res.status(400).json({ msg: "User not found", success: false });
        }

        const otp = generateOtp();

        const mailOptions = {
            from: process.env.SMPT_EMAIL,
            to: id,
            subject: "Password Reset OTP",
            text: `Use this OTP to reset your password: ${otp}. It will expire in 60 minutes.`
        };

        await transporter.sendMail(mailOptions);

        user.passwordChangeOtp = otp;
        user.passwordChangeOtpExpiredAt = otpExpiry();
        await user.save();

        res.status(200).json({ msg: "Password reset OTP sent successfully", success: true });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error", success: false });
    }
};


// Verify Password Reset OTP
export const passwordcheckotp = async (req, res) => {
    const { otp, id } = req.body;
    if (!otp || !id) {
        return res.status(400).json({ success: false, msg: "OTP and ID required" });
    }

    try {
        const user = await adminid.findOne({ id });
        if (!user || user.passwordChangeOtp !== otp || user.passwordChangeOtpExpiredAt < Date.now()) {
            return res.status(400).json({ success: false, msg: "OTP is invalid or expired" });
        }

        user.passwordChangeOtp = null;
        user.passwordChangeOtpExpiredAt = null;
        await user.save();

        res.status(200).json({ success: true, msg: "OTP verified, please enter a new password" });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Internal server error" });
    }
};

// Update Password
export const passwordUpdate = async (req, res) => {
    const { password, id } = req.body;
    if (!password || !id) {
        return res.status(400).json({ success: false, msg: "All fields are required" });
    }

    try {
        const user = await adminid.findOne({ id });
        if (!user) {
            return res.status(400).json({ success: false, msg: "User not found" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ success: true, msg: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Internal server error" });
    }
};



export const deleteuser = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ success: false, msg: "User ID is required" });
    }

    try {
        const targetUser = await adminid.findById(id );
        if (!targetUser) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }
    
        const getmail= targetUser.id
        await adminid.findByIdAndDelete( id );
        res.status(200).json({ success: true, msg: `User '${getmail}' has been deleted by superadmin.` });

    } catch (error) {
        res.status(500).json({ success: false, msg: "Internal server error" });
    }
};

export const getuser=async (req,resp)=>{
 try {
   
    const user= req.user;
    if(!user){
        resp.status(404).json({msg:"User Not Found " ,success:false})
    }
    resp.status(200).json({
        success: true,
        data: {
            id: user._id,
            name: user.name,
            email: user.id,
            role: user.roll,
        },
    });

 } catch (error) {
    resp.status(500).json({ success: false, msg: "Internal server error" });
 }
}

export const getalluser = async (req, resp) => {
    try {
        const users = await adminid.find();
        if (!users || users.length === 0) {
            return resp.status(404).json({ success: false, msg: "No users found" });
        }

        const userData = users.map(user => ({
            _id:user._id,
            name: user.name,
            email: user.id,
            role: user.roll,
        
        }));
      
        resp.status(200).json({ success: true, data: userData });
    } catch (error) {
        resp.status(500).json({ success: false, msg: "Internal server error" });
    }
};

export const updateuser = async (req, resp) => {
  const { id } = req.params;

  if (!id) {
    return resp.status(400).json({ success: false, msg: "User ID is not available" });
  }

  try {
    const { email, roll, name } = req.body;

    if (!email || !roll || !name) {
      return resp.status(400).json({ success: false, msg: "All fields are required" });
    }

    // Check if the user exists
    const user = await adminid.findById(id);
    if (!user) {
      return resp.status(404).json({ success: false, msg: "User not found" });
    }

    // Check if email is used by another user
    const emailExist = await adminid.findOne({ id: email });
    if (emailExist && emailExist._id.toString() !== id) {
      return resp.status(400).json({ success: false, msg: "Email is already used by another user" });
    }

    // Update fields
    user.id = email;
    user.roll = roll;
    user.name = name;
    await user.save();

    return resp.status(200).json({
      success: true,
      msg: "User updated successfully",
      user,
    });

  } catch (error) {
    console.error(error);
    return resp.status(500).json({ success: false, msg: "Internal server error" });
  }
};



export const getUserController = async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({ success: false, msg: "User ID is required." });
    }
  
    try {
      const user = await adminid.findById(id);
  
      if (!user) {
        return res.status(404).json({ success: false, msg: "User not found." });
      }
  
      return res.status(200).json({ success: true, user });
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ success: false, msg: "Server error." });
    }
  };

  export const Checkloginststus=async (req,resp)=>{
  try {
     resp.status(200).json({ success:true,msg:"Login succesfull "})
  } catch (error) {
     return resp.status(500).json({ success: false, msg: "Server error." });
  }
  }


