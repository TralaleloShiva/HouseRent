const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
const authenticate = require("../middleware/authMiddleware"); // ✅ Import middleware

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Protected route
router.get("/me", authenticate, (req, res) => {
  res.json({
    message: "User authenticated",
    user: req.user, // this includes userId and type from JWT
  });
});

module.exports = router;
