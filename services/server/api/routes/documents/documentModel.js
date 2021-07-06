const db = require('../../../data/db-config');

const findAll = () => db('documents');

const findById = (id) => db('documents').where({ id });

const findByName = (name) => db('documents').where({ name: name }).first();

const findByIdAndDelete = (id) => db('documents').where({ id }).del();

const findByRequestId = (reqId) => db('documents').where({requestId: reqId});

const findByIdAndUpdate = (id, document) =>
  db('documents').where({ id }).update(document).returning('*');

const createPlaceholder = (doc) => db('documents').insert(doc).returning('*');

module.exports = {
  findAll,
  findById,
  findByIdAndDelete,
  findByIdAndUpdate,
  findByName,
  createPlaceholder, 
  findByRequestId
};
