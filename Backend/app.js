const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connecttoDB = require('./db/db');
const AmbulanceDriverRoutes = require('./routes/ambulancedriver.routes');

connecttoDB();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/AmbulanceDrivers', AmbulanceDriverRoutes);

module.exports = app;