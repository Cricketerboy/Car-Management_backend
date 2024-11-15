const express = require("express");
const { addCar, listUserCars, searchCars, getCar, updateCar, deleteCar } = require("../controllers/carController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../multerConfig");

const router = express.Router();

router.post("/cars", authMiddleware, upload.array("images", 10), addCar);
router.get("/cars", authMiddleware, listUserCars);
router.get("/cars/search", authMiddleware, searchCars);
router.get("/cars/:id", authMiddleware, getCar);
router.put("/cars/:id", authMiddleware, upload.array("images", 10), updateCar); // Update car
router.delete("/cars/:id", authMiddleware, deleteCar); // Delete car

module.exports = router;
