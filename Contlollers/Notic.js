
import Notic from "../Models/Notic.js";

// Save a new Notic
export const saveNotic = async (req, resp) => {
    const { firstName, lastName, email, phone, message } = req.body; // Added userType4
    if (!firstName || !lastName || !email || !phone || !message) {
        return resp.status(400).json({ success: false, msg: "All fields are required" });
    }
    try {
        const notic = new Notic({ firstName, lastName, email, phone, message });
        await notic.save();
        resp.status(200).json({ success: true, msg: "Data saved successfully" });
    } catch (error) {
        resp.status(500).json({ success: false, msg: "Internal server error", error: error.message });
    }
};

// Delete a Notic by ID
export const deletedNotic = async (req, resp) => {
    const { id } = req.params;
    if (!id) {
        return resp.status(400).json({ success: false, msg: "Id is required" });
    }
    try {
        const notic = await Notic.findByIdAndDelete(id);
        if (!notic) {
            return resp.status(404).json({ success: false, msg: "Notic not found" });
        }
        resp.status(200).json({ success: true, msg: "Data deleted successfully" });
    } catch (error) {
        resp.status(500).json({ success: false, msg: "Internal server error", error: error.message });
    }
};

// Get all Notics
export const getallNotic = async (req, resp) => {
    try {
        const notic = await Notic.find({});
        if (!notic || notic.length === 0) {
            return resp.status(404).json({ success: false, msg: "No Notics found" });
        }
        resp.status(200).json({ success: true, data: notic });
    } catch (error) {
        resp.status(500).json({ success: false, msg: "Internal server error", error: error.message });
    }
};


// Get a Notic by ID
export const getnoticbyid = async (req, resp) => {
    const { id } = req.params;
    if (!id) {
        return resp.status(400).json({ success: false, msg: "Id is required" });
    }
    try {
        const notic = await Notic.findById(id);
        if (!notic) {
            return resp.status(404).json({ success: false, msg: "Notic not found" });
        }
        resp.status(200).json({ success: true, data: notic });
    } catch (error) {
        resp.status(500).json({ success: false, msg: "Internal server error", error: error.message });
    }
};