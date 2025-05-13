import jwt from "jsonwebtoken";
import adminid from "../Models/adminid.js";
import dotenv from "dotenv";
dotenv.config();

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.authToken;
        
        if (!token) {
            return res.status(401).json({ success: false, msg: "No token provided, please login" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await adminid.findById(decoded.id).select('+roll'); // Include roll if it's normally excluded

        if (!user) {
            return res.status(401).json({ success: false, msg: "User not found" });
        }

        // Verify the role exists in the user document
        if (!user.roll) {
            return res.status(401).json({ success: false, msg: "User role not found" });   
        }

        // Attach both user and role to request
        req.user = user;
        req.roll = user.roll; // No need for separate query since roll is part of user
       
      

        next(); // Proceed to next middleware or controller

    } catch (error) {
        console.error("Token verification error:", error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, msg: "Token expired" });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, msg: "Invalid token" });
        }
        return res.status(500).json({ success: false, msg: "Internal server error" });
    }
};

export default verifyToken;