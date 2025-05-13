const isSuperAdmin = (req, res, next) => {
    if (req.roll && req.roll == "superadmin") {
        next(); // user is superadmin, proceed
    } else {
        return res.status(403).json({ success: false, msg: "Access denied: Only superadmin allowed" });
    }
};

export default isSuperAdmin;
