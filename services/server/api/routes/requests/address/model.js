const db = require('../../../../data/db-config');

const create = (address) => db('Addresses').insert(address).returning('*');

const findByRequestId = (requestId) => db('Addresses').where(requestId);

module.exports = {
  create,
  findByRequestId,
};
