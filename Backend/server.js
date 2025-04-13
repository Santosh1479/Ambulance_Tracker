const http = require('http');
const socketIO = require('socket.io');
const app = require('./app'); // Import the app from app.js

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Attach `io` to the app for use in routes or controllers
app.set('io', io);

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('locationUpdate', (data) => {
    console.log('Location update received:', data);
    io.emit('locationBroadcast', data); // Broadcast location updates to all clients
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});