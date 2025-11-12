// server.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


app.use(express.static('public')); // Serve index.html

// Listen for new user connections
io.on('connection', socket => {
  console.log('🔵 User connected:', socket.id);

  // Receive user location
  socket.on('updateLocation', data => {
    // Broadcast this user's location to everyone
    io.emit('userLocationUpdate', data);
  });

  // On disconnect
  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
    io.emit('userDisconnected', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));