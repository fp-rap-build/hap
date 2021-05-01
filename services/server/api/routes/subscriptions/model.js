const db = require('../../../data/db-config');

const create = (subscription) =>
  db('subscriptions').insert(subscription).returning('*');

const findByIdAndDelete = (subscriptionId) =>
  db('subscriptions').where(subscriptionId).del();

module.exports = {
  create,
  findByIdAndDelete,
};
