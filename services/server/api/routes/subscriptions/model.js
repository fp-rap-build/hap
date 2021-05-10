const db = require('../../../data/db-config');

const create = (subscription) =>
  db('subscriptions').insert(subscription).returning('*');

const findBy = (query) => db('subscriptions').where(query);

const findByIdAndDelete = (id) => db('subscriptions').where({ id }).del();

module.exports = {
  create,
  findBy,
  findByIdAndDelete,
};
