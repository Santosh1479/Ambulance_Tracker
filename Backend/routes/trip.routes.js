const express = require("express");
const router = express.Router();
const TripController = require('../controllers/trip.controller');
const { authAmbulanceDriver } = require("../middlewares/auth.middleware");

// 🚑 Trip routes
router.post('/create-trip', authAmbulanceDriver, TripController.startTrip);
router.post('/update-trip', authAmbulanceDriver, TripController.endTrip);
router.get('/ongoing-trips', authAmbulanceDriver, TripController.getOngoingTrips);
router.get('/all-trips', authAmbulanceDriver, TripController.getAllTrips);

module.exports = router;