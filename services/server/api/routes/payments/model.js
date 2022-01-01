const db = require('../../../data/db-config');

exports.findForTable = () =>
  db('payments as p')
    .join('requests as r', 'p.requestId', '=', 'r.id')
    .join('users as u', 'r.userId', '=', 'u.id')
    .join('programs as pr', 'p.programId', '=', 'pr.id')
    .join('addresses as a', 'r.addressId', '=', 'a.id')
    .leftOuterJoin('users as m', 'r.managerId', '=', 'm.id')
    .select(
      'p.id',
      'p.status',
      'p.type',
      'p.accountNumber',
      'p.utilityProviderName',
      'p.utilityProviderAddress',
      'p.renterOrOwner',
      'p.utilityProviderName',
      'p.processed',
      'p.requestId',
      'u.firstName',
      'u.lastName',
      'a.address',
      'a.addressLine2',
      'a.cityName',
      'a.state',
      'a.zipCode',
      'u.email',
      'u.gender',
      'u.dob',
      'r.managerId',
      'm.firstName as managerFirstName',
      'm.lastName as managerLastName',
      'm.email as managerEmail',
      'pr.name as program',
      'r.landlordName',
      'r.landlordEmail',
      'p.amountBack',
      'p.amountForward',
      'p.amount',
      'p.monthsBack',
      'p.totalArrears',
      'p.monthsForward',
      'p.createdAt as approveDate',
      'r.requestDate as requestDate',
      'r.familySize',
      'r.totalChildren',
      'r.monthlyIncome',
      'r.monthlyRent',
      'r.amountRequested',
      'a.zipCode',
      'r.requestDate',
      'r.beds',
      'r.hispanic',
      'r.asian',
      'r.black',
      'r.pacific',
      'r.white',
      'r.native',
      'r.demoNotSay',
      'r.hispanicHOH',
      'r.asianHOH',
      'r.blackHOH',
      'r.pacificHOH',
      'r.whiteHOH',
      'r.nativeHOH',
      'r.demoNotSayHOH',
      'r.beds',
      'r.childrenAges'
    );

exports.findById = (id) => db('payments').where({ id }).first();

exports.findByIdAndUpdate = (id, payload) =>
  db('payments').where({ id }).update(payload).returning('*');

exports.findByIdAndDelete = (id) => db('payments').where({ id }).del();
