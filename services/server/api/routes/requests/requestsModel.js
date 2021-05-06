const db = require('../../../data/db-config');

const findAll = async (user) =>
  await db('requests').modify((qb) => {
    // Only return requests that belong to the users organization
    if (user.organizationId) {
      qb.where({ orgId: user.organizationId });
    }
  });

const create = (request) => {
  return db('requests').insert(request).returning('*');
};

const remove = async (id) => await db('requests').where({ id }).del();

const removeAllCommentsByRequestId = async (requestId) =>
  db('comments').where({ requestId }).del();

const update = (id, request) => {
  return db('requests').where({ id }).first().update(request).returning('*');
};

const findAllActive = () => {
  return db('requests as r')
    .join('users as tenant', 'r.tenantId', '=', 'tenant.id')
    .join('users as landlord', 'r.landlordId', '=', 'landlord.id')
    .select(
      'r.id',
      'tenant.firstName as tFirstName',
      'tenant.lastName as tLastName',
      'landlord.firstName as llFirstName',
      'landlord.lastName as llLastName',
      'r.requestStatus',
      'r.requestDate',
      'r.apmApproval',
      'r.pmApproval',
      'r.bookKeeperApproval',
      'r.headAcctApproval',
      'r.adminApproval'
    )
    .whereNot('r.requestStatus', 'denied');
};

const findForTable = () => {
  return db('requests as r')
    .join('addresses as a', 'r.addressId', '=', 'a.id')
    .join('users as u', 'r.userId', '=', 'u.id')
    .select(
      'r.id',
      'u.firstName',
      'u.lastName',
      'u.email',
      'u.role',
      'r.familySize',
      'r.monthlyIncome',
      'r.requestStatus',
      'r.requestDate',
      'r.apmApproval',
      'r.pmApproval',
      'r.bookKeeperApproval',
      'r.headAcctApproval',
      'r.adminApproval',
      'r.verifiedDocuments',
      'r.foodWrkr',
      'r.unEmp90',
      'r.orgId',
      'a.address',
      'a.zipCode',
      'a.cityName',
      'a.state'
    );
};

const findBy = (filter) => {
  return db('requests').where(filter);
};

const findById = (id) => {
  return db('requests as r')
    .join('addresses as a', 'r.addressId', '=', 'a.id')
    .join('users as u', 'r.userId', '=', 'u.id')
    .select(
      'r.*',
      'r.id',
      'u.firstName',
      'u.lastName',
      'u.email',
      'u.role',
      'r.familySize',
      'r.monthlyIncome',
      'r.requestStatus',
      'r.requestDate',
      'r.apmApproval',
      'r.pmApproval',
      'r.bookKeeperApproval',
      'r.headAcctApproval',
      'r.adminApproval',
      'r.verifiedDocuments',
      'r.foodWrkr',
      'r.amountRequested',
      'r.orgId',
      'r.unEmp90',
      'r.tenantEmail',
      'r.tenantNumber',
      'r.landlordEmail',
      'r.landlordNumber',
      'a.address',
      'a.zipCode',
      'a.cityName',
      'a.state'
    )
    .where('r.id', '=', id);
};

const findAllComments = (requestId) =>
  db('comments as c')
    .where({ requestId })
    .join('users as u', 'c.authorId', 'u.id')
    .select(
      'c.id',
      'c.requestId',
      'c.authorId',
      'u.firstName',
      'u.lastName',
      'c.comment',
      'c.category',
      'c.createdAt'
    )
    .orderBy('c.createdAt', 'asc');

module.exports = {
  findAll,
  findBy,
  create,
  remove,
  removeAllCommentsByRequestId,
  update,
  findAllActive,
  findForTable,
  findById,
  findAllComments,
};
