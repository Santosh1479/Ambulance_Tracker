const express = require("express");
const router = express.Router();
const hospitalController = require("../controllers/Hospitals.controller");

// Route to create a new hospital
router.post("/create", hospitalController.createHospital);

// Route to update an existing hospital
router.put("/update/:id", hospitalController.updateHospital);

// Route to fetch all hospitals
router.get("/all", hospitalController.getAllHospitals);

router.patch('/approve/:driverId', authHospitalPersonnel, hospitalController.approveAmbulanceDriver);

module.exports = router;