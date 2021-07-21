const db = require('../../../data/db-config');

const findByIdAndDelete = (id) =>
  db('userNotifications').where({ id }).del().returning('*');

const findByIdAndUpdate = (id, payload) =>
  db('userNotifications').where({ id }).update(payload).returning('*');

module.exports = {
  findByIdAndDelete,
  findByIdAndUpdate,
};
