const org = (orgId) => 'organization:' + orgId;

const request = (requestId) => 'request:' + requestId;

const chat = (requestId) => 'chatroom:' + requestId;

module.exports = {
  org,
  request,
  chat,
};
