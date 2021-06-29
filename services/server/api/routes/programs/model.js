const db = require('../../../data/db-config');

const findAll = () => db('programs');

const create = (program) => db('programs').insert(program).returning('*');

const findById = (id) => db('programs').where({ id }).first()

const findByIdAndUpdate = (id, program) =>
  db('programs').where({ id }).update(program).returning('*');

const findByIdAndDelete = (id) => db('programs').where({ id }).del();

module.exports = {
  findAll,
  create,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
};
