const db = require('../../../data/db-config');

const findAll = () => {
  return db('ages');
};

const create = (age) => {
  return db('ages').insert(age).returning('*');
};

const findByRequestId = (reqId) => {
  return db('ages').where('requestId', reqId).returning('*');
};

const update = (id, age) => {
  return db('ages').where('id', id).update(age).returning('*');
};

module.exports = {
  findAll,
  create,
  findByRequestId,
  update,
};
