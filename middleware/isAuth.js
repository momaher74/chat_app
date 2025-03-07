const jwt = require("jsonwebtoken");

module.exports.isAuth = (req, res, next) => {
    // Get token from request headers
    const token = req.header("token");

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, "MeMo"); // Replace with your actual secret key
        req.id = decoded.userId; // Attach user payload to request object
        next(); // Proceed to next middleware/controller
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};
