const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const path = require('path');



const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Set up Handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public folder
app.use(express.static('public'));

// Render the chat interface
app.get('/', (req, res) => {
  res.render('index');
});

// Socket.io handling
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for chat messages
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Broadcast the message to all connected clients
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} hand emoji`);
});
