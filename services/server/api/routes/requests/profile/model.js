const db = require('../../../../data/db-config');

exports.getAllRequestInformation = () => db('requests');
