const db = require('../../../data/db-config');

const findAll = () => {
  return db('ages');
};

const create = (age) => {
  return db('ages').insert(age).returning('*');
};

const findByUserId = (userId) => {
  return db('ages').where('userId', userId).returning('*');
};

const update = (id, age) => {
  return db('ages').where('id', id).update(age).returning('*');
};

const removeById = (id) => {
  return db('ages').where('id', id).del();
}



module.exports = {
  findAll,
  create,
  findByUserId,
  update,
  removeById
};
