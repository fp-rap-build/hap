const db = require('../../../data/db-config');

const findAll = () => {
  return db('organizations');
};

const findById = (id) => {
  return db('organizations').where('id', id).first();
};

const getProgramsByOrgId = (organizationId) =>
  db('programs').where({ organizationId });

const createProgram = (program) => db('programs').insert(program);

const findBy = (name) => {
  return db('organizations').where(name).first;
};

const create = (org) => {
  return db('organizations').insert(org).returning('*');
};

const update = (id, org) => {
  return db('organizations').where('id', id).update(org).returning('*');
};

const remove = (id) => {
  return db('organizations').where('id', id).del();
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
  findBy,
  getProgramsByOrgId,
  createProgram,
};
