const db = require('../../../../data/db-config');

const create = (payment) => db('payments').insert(payment).returning('*');

module.exports = {
  create,
};
