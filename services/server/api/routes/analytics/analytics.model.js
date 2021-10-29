const db = require('../../../data/db-config');

const getFamiliesServed = () => {
  return db
    .countDistinct('requestId')
    .from('payments')
};

const getPeopleServed = () => {
  return db('payments as p')
    .join('requests as r', 'p.requestId', '=', 'r.id')
    .where('requestStatus', '=', 'approved')
    .sum('familySize');
};

const getChildrenServed = () => {
  return db('payments as p')
    .join('requests as r', 'p.requestId', '=', 'r.id')
    .where('requestStatus', '=', 'approved')
    .sum('totalChildren');
};

// merge payments table with requests table

const getTotalEraPeople = () => {
  return db('payments as p')
    .join('requests as r', 'p.requestId', '=', 'r.id')
    .andWhere('programId', '=', 3)
    .sum('familySize');
}


const getEraChildrenServed = () => {
  return db('payments as p')
    .join('requests as r', 'p.requestId', '=', 'r.id')
    .where('r.requestStatus', '=', 'approved')
    .andWhere('p.programId', '=', 3)
    .sum('totalChildren');
};

const getTotalEraApproved = () => {
  return db
    .countDistinct('requestId')
    .from('payments')
    .where('programId', '=', 3)
};

const getTotalEraAmount = () => {
  return db
    .sum('amount')
    .from('payments')
    .where('programId', '=', 3);
};
module.exports = { getFamiliesServed, getPeopleServed, getChildrenServed, getTotalEraApproved, getTotalEraAmount, getEraChildrenServed, getTotalEraPeople };
