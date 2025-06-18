const Booking = require("../config/models/BookingModel");
const Property = require("../config/models/PropertyModel"); // ✅ Needed for fetching available properties

// 📌 Renter books a property
const bookProperty = async (req, res) => {
  const { propertyId, ownerId, username } = req.body;

  try {
    const newBooking = new Booking({
      propertyId,
      userId: req.user.userId,
      ownerId,
      username,
      status: "pending",
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking request submitted", booking: newBooking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Owner gets all bookings for their properties
const getBookingsForOwner = async (req, res) => {
  try {
    const bookings = await Booking.find({ ownerId: req.user.userId }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Owner updates booking status (approve/reject)
const updateBookingStatus = async (req, res) => {
  const bookingId = req.params.id;
  const { status } = req.body; // "approved" or "rejected"

  try {
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: `Booking ${status}`, booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Renter gets all their bookings
const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.userId;
    const bookings = await Booking.find({ userId })
      .populate("propertyId")
      .populate("ownerId")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Fetch all available properties (for Renter Dashboard)
const getAllAvailableProperties = async (req, res) => {
  try {
    const properties = await Property.find({ isAvailable: true }).sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  bookProperty,
  getBookingsForOwner,
  updateBookingStatus,
  getMyBookings,
  getAllAvailableProperties, // ✅ Include it here
};
