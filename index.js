// Dependencies
const express = require('express');
const expressApp = express();
const http = require('http').Server(expressApp);
const path = require('path');
const cors = require('cors');
const Statics = require('./middlewares/Statics');
const io = require('socket.io')(http, {
    cors: { origin: '*', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' },
});

// Middlewares
expressApp.use(express.json());
expressApp.use(cors());
// Statics()

// Import routers/sockets
require('./routes/Api')(expressApp);
require('./routes/Sockets')(io);

// Setup static server
expressApp.use(express.static(path.join(__dirname, 'conversel-web')));
expressApp.get('/*', (request, response) => {
    response.sendFile(path.join(__dirname, 'conversel-web/index.html'));
});

// Start server
http.listen(3001, async () => {
    console.log('Starting, http://localhost:3001');
});