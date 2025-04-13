const http = require('http');
const app = require('./app'); // Import the app from app.js
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Frontend URL
    methods: ['GET', 'POST'],
  },
});

// Socket.IO logic
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for ambulance location updates
  socket.on('ambulanceLocation', (data) => {
    const { tripId, location } = data;
    // Broadcast the location to all clients in the trip room
    io.to(`trip-${tripId}`).emit('ambulanceLocationUpdate', location);
  });

  // Join a trip room
  socket.on('joinTrip', (tripId) => {
    socket.join(`trip-${tripId}`);
    console.log(`User joined trip-${tripId}`);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});