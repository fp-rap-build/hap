const db = require('../../../data/db-config');

exports.findForTable = () =>
  db('payments as p')
    .join('requests as r', 'p.requestId', '=', 'r.id')
    .join('users as u', 'r.userId', '=', 'u.id')
    .select('p.id', 'u.firstName', 'u.lastName', 'u.email', 'p.amount');

exports.findById = (id) => db('payments').where({ id }).first();

exports.findByIdAndUpdate = (id, payload) =>
  db('payments').where({ id }).update(payload).returning('*');

exports.findByIdAndDelete = (id) => db('payments').where({ id }).del();
