const express = require("express");
const router = express.Router();
const {
  bookProperty,
  getMyBookings,
  getBookingsForOwner,
  updateBookingStatus,
} = require("../controllers/bookingController");

const authenticate = require("../middleware/authMiddleware");

// Renter books a property
router.post("/book", authenticate, bookProperty);

// Renter views their bookings
router.get("/my-bookings", authenticate, getMyBookings);

// Owner views all bookings on their properties
router.get("/owner-bookings", authenticate, getBookingsForOwner);

// Owner updates booking status
router.put("/update-status/:id", authenticate, updateBookingStatus);

module.exports = router;
