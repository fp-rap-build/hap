const db = require('../../../../data/db-config');

const save = (document) => db('documents').insert(document).returning('*');

const findAll = () => db('documents');

const findAllByRequestId = (requestId) => db('documents').where({ requestId });

const update = (id, change) => {
  return db('documents').where({ id }).first().update(change).returning('*');
};

module.exports = {
  save,
  findAll,
  findAllByRequestId,
  update,
};
