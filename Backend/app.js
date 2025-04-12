const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connecttoDB = require('./db/db');
const AmbulanceDriverRoutes = require('./routes/ambulancedriver.routes');
const PoliceRoutes = require('./routes/police.routes');
const TripRoutes = require('./routes/trip.routes');
const hospitalRoutes = require('./routes/Hospitals.routes');

connecttoDB();

const app = express();
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
app.use('/poilce',PoliceRoutes );

module.exports = app;