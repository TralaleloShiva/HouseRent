const Property = require("../config/models/PropertyModel");

// ADD Property
const addProperty = async (req, res) => {
  const { prop, isAvailable, ownerContact, addInfo } = req.body;

  try {
    const newProperty = new Property({
      userId: req.user.userId,  // ✅ Corrected field from token
      prop,
      isAvailable,
      ownerContact,
      addInfo
    });

    await newProperty.save();
    res.status(201).json({ message: "Property added successfully", property: newProperty });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET all properties of logged-in user
const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ userID: req.user.userId });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE Property
const updateProperty = async (req, res) => {
  const propertyId = req.params.id;
  try {
    const updated = await Property.findByIdAndUpdate(propertyId, req.body, { new: true });
    res.json({ message: "Updated successfully", updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE Property
const deleteProperty = async (req, res) => {
  const propertyId = req.params.id;
  try {
    await Property.findByIdAndDelete(propertyId);
    res.json({ message: "Property deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addProperty,
  getMyProperties,
  updateProperty,
  deleteProperty
};
