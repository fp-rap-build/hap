const app = require('./api/app.js');

const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
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
    socket.join(orgId);
  });

  socket.on('requestChange', ({ orgId, message }) => {
    io.to(orgId).emit('notification', message);
  });

  socket.on('postRequest', ({ orgId, request }) => {
    io.to(orgId).emit('notification', 'A new request has been submitted');
    io.to(orgId).emit('newRequest', request);
  });
});

server.listen(port, () => {
  console.log(`\n** Running on port ${port} **\n`);
});

server.timeout = 60 * 10 * 1000;

module.exports = io;
