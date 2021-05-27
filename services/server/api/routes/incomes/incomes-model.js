const db = require('../../../data/db-config');

const create = (incomeData) => {
  return db('incomes').insert(incomeData).returning('*');
};

const findByRequestId = (requestId) => {
  return db('incomes').where('requestId', requestId);
};

const update = (id, change) => {
  return db('incomes').where('id', id).update(change).returning('*');
};

const remove = (id) => {
  return db('incomes').where('id', id).del();
};

module.exports = { create, findByRequestId, update, remove };
