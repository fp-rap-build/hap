const app = require('./api/app.js');

const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const genRoom = require('./generators/genRoom');
const { request } = require('express');
const { createBrotliCompress } = require('zlib');
const port = process.env.PORT || 8000;

const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: [
      'http://localhost:3000',
      'http://192.168.1.9:3000',
      'https://hapdev.vercel.app',
    ],
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  socket.on('joinOrganization', (orgId) => {
    console.log(genRoom.org(orgId));
    socket.join(genRoom.org(orgId));
  });

  socket.on('joinRequest', (requestId) => {
    socket.join(genRoom.request(requestId));
  });

  socket.on('leaveRequest', (requestId) => {
    socket.leave(genRoom.request(requestId));
  });

  socket.on('requestChange', ({ requestId, message }) => {
    console.log(requestId);
    console.log(message)
    io.to(genRoom.request(requestId)).emit('notification', message);
  });

  socket.on('postRequest', ({ orgId, request }) => {
    io.to(genRoom.org(orgId)).emit(
      'notification',
      'A new request has been submitted'
    );
  });
});

server.listen(port, () => {
  console.log(`\n** Running on port ${port} **\n`);
});

server.timeout = 60 * 10 * 1000;

module.exports = io;
