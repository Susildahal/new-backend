import Principal from "../Models/Princaple.js";



export const addPrincipal = async (req, res) => {
  try {
    const { principalName, message } = req.body;
    const photo = req.file?.filename;

    // Validate required fields
    if (!principalName || !message || !photo) {
      return res.status(400).json({ error: "All fields including photo are required." });
    }

    // Normalize line breaks (optional)
    const normalizedMessage = message.replace(/\r\n|\r|\n/g, '\n');

    const newPrincipal = new Principal({
      principalName,
      message: normalizedMessage,
      photo,
    });

    await newPrincipal.save();

    return res.status(201).json({ success: true, message: "Principal added successfully!" });
  } catch (error) {
    console.error("Error saving principal:", error);
    return res.status(500).json({ error: "Server Error. Please try again later." });
  }
};


export const updatePrincipal = async (req, res) => {
  try {
    const { principalName, message } = req.body;
    const photo = req.file?.filename;

    // Normalize line endings
    const normalizedMessage = message.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    const updatedPrincipal = await Principal.findOneAndUpdate(
      {},
      { 
        principalName, 
        message: normalizedMessage,  // Store with normalized line breaks
        ...(photo && { photo })     // Only update photo if new one was uploaded
      },
      { new: true }
    );

    if (!updatedPrincipal) {
      return res.status(404).json({ error: "Principal not found" });
    }
    res.status(200).json({ 
      message: "Principal updated successfully!",
      principal: updatedPrincipal 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const getPrincipal = async (req, res) => {
  try {
    const principal = await Principal.findOne(); // Only one principal expected
    if (!principal) {
      return res.status(404).json({ message: "Principal not found" });
    }
    res.status(200).json(principal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};