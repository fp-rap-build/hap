const db = require('../../../data/db-config');

exports.findForTable = () => db('payments');
