const db = require('../../../../data/db-config');

const create = (payment) => db('payments').insert(payment).returning('*');

const findAllByRequestId = (requestId) => db('payments').where({ requestId });

module.exports = {
  create,
  findAllByRequestId,
};
