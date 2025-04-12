const TripController = require('../controllers/trip.controller');

// 🚑 Trip routes
router.post('/start-trip',authAmbulanceDriver, TripController.startTrip);
router.post('/end-trip',authAmbulanceDriver, TripController.endTrip);
router.get('/trips-by-date', authAmbulanceDriver, AmbulanceDriverController.TripController.getTripsByDate);
