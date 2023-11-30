const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const authenticateAndAuthorize = (roles) => {
  return async (req, res, next) => {
    try {
      const token = req.header("Authorization");

      if (!token) {
        return res.status(401).json({ error: "Unauthorized: Missing token" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({ error: "Unauthorized: User not found" });
      }

      req.user = user;

      if (!roles.includes(user.role)) {
        return res
          .status(403)
          .json({ error: "Forbidden: Insufficient privileges" });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
  };
};

module.exports = { authenticateAndAuthorize };
