const db = require('../../../data/db-config');

const findAll = () => {
  return db('addresses');
};

const findById = (id) => {
  return db('addresses').where('id', id).first();
};

const findBy = (filter) => {
  return db('addresses').where(filter);
};

const create = (addr) => {
  return db('addresses').insert(addr).returning('*');
};

const update = (id, addr) => {
  return db('addresses').where('id', id).update(addr).returning('*');
};

const remove = (id) => {
  return db('addresses').where('id', id).del();
};

module.exports = {
  findAll,
  findById,
  findBy,
  create,
  update,
  remove,
};
