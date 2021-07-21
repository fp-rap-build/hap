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
      'https://hap.solutions',
    ],
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  socket.on('joinOrganization', (orgId) => {
    socket.join(genRoom.org(orgId));
  });

  socket.on('joinRequest', (requestId) => {
    socket.join(genRoom.request(requestId));
  });

  socket.on('leaveRequest', (requestId) => {
    socket.leave(genRoom.request(requestId));
  });

  socket.on('joinChat', (requestId) => {
    socket.join(genRoom.chat(requestId));
  });

  socket.on('leaveChat', (requestId) => {
    socket.leave(genRoom.chat(requestId));
  });

  socket.on('comment', async (comment) => {
    const { requestId, authorId, notificationMessage } = comment;

    let subscribedUsers = await db('subscriptions as s')
      .join('users as u', 's.userId', '=', 'u.id')
      .where('s.requestId', '=', requestId)
      .where('u.id', '<>', authorId)
      .select('s.userId');

    let notifications = subscribedUsers.map((row) => {
      row['requestId'] = requestId;
      row['message'] = notificationMessage;
      return row;
    });

    if (notifications.length !== 0) {
      await db('userNotifications').insert(notifications);
    }

    io.to(genRoom.request(requestId)).emit('requestChange', {
      message: notificationMessage,
      requestId,
      senderId: authorId,
    });

    io.to(genRoom.chat(requestId)).emit('comment', comment);
  });

  socket.on('requestChange', async ({ requestId, senderId, message }) => {
    const payload = {
      message,
      requestId,
      senderId,
    };

    let subscribedUsers = await db('subscriptions as s')
      .join('users as u', 's.userId', '=', 'u.id')
      .where('s.requestId', '=', requestId)
      .where('u.id', '<>', senderId)
      .select('s.userId');

    let notifications = subscribedUsers.map((row) => {
      row['requestId'] = requestId;
      row['message'] = message;
      return row;
    });

    if (notifications.length !== 0) {
      await db('userNotifications').insert(notifications);
    }

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
