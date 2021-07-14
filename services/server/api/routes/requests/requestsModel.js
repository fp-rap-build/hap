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

const findForTable = (params) => {
  return db('requests as r')
    .join('addresses as a', 'r.addressId', '=', 'a.id')
    .join('users as u', 'r.userId', '=', 'u.id')
    .fullOuterJoin('users as m', 'r.managerId', '=', 'm.id')

    .select(
      'r.id',
      'r.userId',

      'm.firstName as managerFirstName',
      'm.lastName as managerLastName',
      'm.email as managerEmail',

      'u.firstName',
      'u.lastName',
      'u.email',
      'u.role',
      'u.dob',
      'u.gender',

      'r.familySize',
      'r.monthlyIncome',
      'r.owed',
      'r.requestStatus',
      'r.requestDate',
      'r.apmApproval',
      'r.pmApproval',
      'r.bookKeeperApproval',
      'r.headAcctApproval',
      'r.adminApproval',

      'r.hispanic',
      'r.asian',
      'r.black',
      'r.pacific',
      'r.white',
      'r.native',
      'r.demoNotSay',
      'r.amountRequested',

      'r.hispanicHOH',
      'r.asianHOH',
      'r.blackHOH',
      'r.pacificHOH',
      'r.whiteHOH',
      'r.nativeHOH',
      'r.demoNotSayHOH',
      'r.beds',

      'r.verifiedDocuments',
      'r.foodWrkr',
      'r.unEmp90',
      'r.orgId',
      'r.landlordName',
      'r.landlordAddress',
      'r.landlordAddress2',
      'r.landlordCity',
      'r.landlordState',
      'r.landlordZip',
      'r.childrenAges',
      'r.incomplete',
      'a.address',
      'a.zipCode',
      'a.cityName',
      'a.state'
    )
    .modify((qb) => {
      if (params.archived) {
        qb.where({ archived: params.archived });
      }
    })
    .modify((qb) => {
      if (params.incomplete) {
        qb.where({ incomplete: params.incomplete });
      }
    });
};

const requestOnlyById = (id) => {
  return db('requests').where('id', '=', id).first();
};

const findById = (id) => {
  return db('requests as r')
    .join('addresses as a', 'r.addressId', '=', 'a.id')
    .join('users as u', 'r.userId', '=', 'u.id')
    .join('payments as p', 'r.id', '=', 'p.requestId')
    .join('programs as pr', 'p.programId', '=', 'pr.id')
    .fullOuterJoin('users as m', 'r.managerId', '=', 'm.id')
    .select(
      'u.firstName',
      'u.lastName',
      'u.email',
      'u.role',
      'u.dob',
      'u.gender',

      'm.firstName as managerFirstName',
      'm.lastName as managerLastName',
      'm.email as managerEmail',

      'r.*',
      'r.userId',
      'r.id',
      'r.familySize',
      'r.monthlyIncome',
      'r.owed',
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
      'r.budget',
      'r.orgId',
      'r.unEmp90',
      'r.beds',
      'r.hispanicHOH',
      'r.asianHOH',
      'r.blackHOH',
      'r.pacificHOH',
      'r.whiteHOH',
      'r.nativeHOH',
      'r.demoNotSayHOH',
      'r.beds',
      'r.tenantEmail',
      'r.tenantNumber',
      'r.landlordName',
      'r.landlordAddress',
      'r.landlordAddress2',
      'r.landlordCity',
      'r.landlordState',
      'r.landlordZip',
      'r.landlordEmail',
      'r.landlordNumber',
      'r.childrenAges',
      'r.incomplete',

      'a.address',
      'a.zipCode',
      'a.cityName',
      'a.state',

      'p.amount as amountApproved',
      'pr.name as budget',
      'pr.id as pid'
    )
    .where('r.id', '=', id)
    .orderBy('p.createdAt', 'desc');
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
  requestOnlyById,
  create,
  remove,
  removeAllCommentsByRequestId,
  update,
  findAllActive,
  findForTable,
  findById,
  findAllComments,
};
