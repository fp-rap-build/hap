const db = require('../../../data/db-config');

exports.findForTable = () =>
  db('payments as p')
    .join('requests as r', 'p.requestId', '=', 'r.id')
    .join('users as u', 'r.userId', '=', 'u.id')
    .join('programs as pr', 'p.programId', '=', 'pr.id')
    .join('addresses as a', 'p.requestId', '=', 'a.id')
    .select(
      'p.id',
      'p.requestId',
      'u.firstName',
      'u.lastName',
      'u.email',
      'u.gender',
      'u.dob',
      'pr.name as program',
      'p.amount',
      'p.monthsBack',
      'p.monthsForward',
      'p.createdAt as approveDate',
      'r.requestDate as requestDate',
      'r.familySize',
      'r.totalChildren',
      'r.monthlyIncome',
      'r.monthlyRent',
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
