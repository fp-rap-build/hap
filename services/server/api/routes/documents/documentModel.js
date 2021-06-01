const db = require('../../../data/db-config');

const findAll = () => db('documents');

const findById = (id) => db('documents').where({ id });

const findByName = (name) => db('documents').where({ name: name }).first();

const findByIdAndDelete = (id) => db('documents').where({ id }).del();

const findByIdAndUpdate = (id, document) =>
  db('documents').where({ id }).update(document).returning('*');

module.exports = {
  findAll,
  findById,
  findByIdAndDelete,
  findByIdAndUpdate,
  findByName,
};
