const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connecttoDB = require('./db/db');
const AmbulanceDriverRoutes = require('./routes/ambulancedriver.routes');
const PoliceRoutes = require('./routes/police.routes');
const TripRoutes = require('./routes/trip.routes');
const HospitalRoutes = require('./routes/Hospitals.routes');
const hospitalheadRoutes = require('./routes/hospitalhead.routes');

// Connect to the database
connecttoDB();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/ambulancedriver', AmbulanceDriverRoutes);
app.use('/police', PoliceRoutes);
app.use('/trips', TripRoutes);
app.use('/hospitals', HospitalRoutes);
app.use("/hospitalhead", hospitalheadRoutes);

module.exports = app;