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
      'a.address',
      'a.zipCode',
      'a.cityName',
      'a.state'
    )
    .where('r.id', '=', id);
};

module.exports = {
  findAll,
  findBy,
  create,
  remove,
  update,
  findAllActive,
  findForTable,
  findById,
};
