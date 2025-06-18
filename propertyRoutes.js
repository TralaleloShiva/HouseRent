const express = require("express");
const router = express.Router();
const Property = require("../config/models/PropertyModel");

const {
  addProperty,
  getMyProperties,
  updateProperty,
  deleteProperty
} = require("../controllers/propertyController");

const verifyToken = require("../middleware/authMiddleware"); // ✅ Correct import

// ✅ Secure routes with middleware
router.post("/add", verifyToken, addProperty);
router.get("/my-properties", verifyToken, getMyProperties);
router.put("/update/:id", verifyToken, updateProperty);
router.delete("/delete/:id", verifyToken, deleteProperty);
// Get property by ID (used for bookings display)
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
