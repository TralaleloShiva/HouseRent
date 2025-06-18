const express = require("express");
const router = express.Router();

const {
  bookProperty,
  getMyBookings,
  getBookingsForOwner,
  updateBookingStatus,
} = require("../controllers/bookingController");

const {
  getAllAvailableProperties, // ✅ Import added here
} = require("../controllers/propertyController"); // ✅ Assuming it's defined here

const authenticate = require("../middleware/authMiddleware");

// Routes
router.post("/book", authenticate, bookProperty);
router.get("/my-bookings", authenticate, getMyBookings);
router.get("/owner-bookings", authenticate, getBookingsForOwner);
router.get("/properties", authenticate, getAllAvailableProperties); // ✅ This now works
router.put("/update-booking/:id", authenticate, updateBookingStatus);

module.exports = router;
