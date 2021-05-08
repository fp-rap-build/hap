const db = require('../../../data/db-config');

const findByIdAndDelete = (id) =>
  db('userNotifications').where({ id }).del().returning('*');

module.exports = {
  findByIdAndDelete,
};
