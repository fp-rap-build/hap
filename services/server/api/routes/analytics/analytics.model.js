const db = require('../../../data/db-config');

const getFamiliesServed = () => {
  return db
    .count('requestStatus')
    .from('requests')
    .where('requestStatus', '=', 'approved');
};

const getPeopleServed = () => {
  return db
    .sum('familySize')
    .from('requests')
    .where('requestStatus', '=', 'approved');
};

const getChildrenServed = () => {
  return db
    .sum('totalChildren')
    .from('requests')
    .where('requestStatus', '=', 'approved');
};
module.exports = { getFamiliesServed, getPeopleServed, getChildrenServed };
