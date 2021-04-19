const db = require('../../../../data/db-config');

const save = (document) => db('documents').insert(document).returning('*');

const findAll = () => db('documents');

const findAllByRequestId = (requestId) => db('documents').where({ requestId });

module.exports = {
  save,
  findAll,
  findAllByRequestId,
};
