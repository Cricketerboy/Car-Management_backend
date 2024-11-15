const Car = require("../models/carModel");

const addCar = async (req, res) => {
  try {
    const carData = {
      ...req.body,
      user: req.user.id,
      images: req.files.map(file => file.path)
    };
    const newCar = await Car.create(carData);
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// List all cars of logged-in user
const listUserCars = async (req, res) => {
  try {
    const cars = await Car.find({ user: req.user.id });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Global search
const searchCars = async (req, res) => {
  try {
    const { keyword } = req.query;
    const cars = await Car.find({
      user: req.user.id,
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { tags: { $regex: keyword, $options: "i" } }
      ]
    });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCar = async (req, res) => {
    try {
      const carId = req.params.id; // Get the car ID from the URL params
      const car = await Car.findOne({ _id: carId, user: req.user.id }); // Check that the car belongs to the logged-in user
  
      if (!car) {
        return res.status(404).json({ error: "Car not found" }); // Handle case when car is not found
      }
  
      res.status(200).json(car); // Return the car details
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Update a car
const updateCar = async (req, res) => {
    try {
      const carId = req.params.id; // Get car ID from URL
      const carData = { ...req.body };
  
      // Handle images update
      if (req.files && req.files.length > 0) {
        carData.images = req.files.map(file => file.path); // Update images if any new ones are uploaded
      }
  
      const updatedCar = await Car.findOneAndUpdate(
        { _id: carId, user: req.user.id }, // Ensure the car belongs to the logged-in user
        { $set: carData },
        { new: true } // Return the updated car
      );
  
      if (!updatedCar) {
        return res.status(404).json({ error: "Car not found" });
      }
  
      res.status(200).json(updatedCar); // Return the updated car
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Delete a car
const deleteCar = async (req, res) => {
    try {
      const carId = req.params.id; // Get car ID from URL
      const deletedCar = await Car.findOneAndDelete({ _id: carId, user: req.user.id }); // Ensure the car belongs to the logged-in user
  
      if (!deletedCar) {
        return res.status(404).json({ error: "Car not found" });
      }
  
      res.status(200).json({ message: "Car deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  
  module.exports = { addCar, listUserCars, searchCars, getCar, updateCar, deleteCar };
