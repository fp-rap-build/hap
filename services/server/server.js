const app = require('./api/app.js');

const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const genRoom = require('./generators/genRoom');

const db = require('./data/db-config');

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
    console.log(genRoom.request(requestId));
    socket.join(genRoom.request(requestId));
  });

  socket.on('leaveRequest', (requestId) => {
    socket.leave(genRoom.request(requestId));
  });

  socket.on('joinChat', (requestId) => {
    console.log(genRoom.chat(requestId), 'joined');
    socket.join(genRoom.chat(requestId));
  });

  socket.on('leaveChat', (requestId) => {
    console.log(genRoom.chat(requestId), 'left');
    socket.leave(genRoom.chat(requestId));
  });

  socket.on('comment', (comment) => {
    const { requestId, firstName } = comment;

    const recentComments = {};

    recentComments[requestId] = new Date();

    console.log(recentComments);

    io.to(genRoom.request(requestId)).emit('requestChange', {
      message: `${firstName} recently left a comment`,
      requestId,
    });

    io.to(genRoom.chat(requestId)).emit('comment', comment);
  });

  socket.on('requestChange', async ({ requestId, message }) => {
    const payload = {
      message,
      requestId,
    };

    let subscribedUsers = await db('subscriptions as s')
      .join('users as u', 's.userId', '=', 'u.id')
      .where('s.requestId', '=', requestId)
      .select('s.userId');

    let notifications = subscribedUsers.map((row) => {
      row['requestId'] = requestId;
      row['message'] = message;
      return row;
    });

    console.log(notifications);

    await db('userNotifications').insert(notifications);

    io.to(genRoom.request(requestId)).emit('requestChange', payload);
  });

  socket.on('postRequest', async ({ orgId, requestId, message }) => {
    const payload = {
      requestId,
      message,
    };

    let allUsersInOrg = await db('users')
      .where({ organizationId: orgId })
      .select('id as userId');

    let notifications = allUsersInOrg.map((row) => {
      row['requestId'] = requestId;
      row['message'] = message;
      return row;
    });

    await db('userNotifications').insert(notifications);

    io.to(genRoom.org(orgId)).emit('requestChange', payload);
  });
});

server.listen(port, () => {
  console.log(`\n** Running on port ${port} **\n`);
});

server.timeout = 60 * 10 * 1000;

module.exports = io;
