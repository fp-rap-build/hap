const db = require('../db-config');

exports.seed = async function (knex) {
  //Pull uuids from newley created users table
  const users = await db('users');
  //res:
  //[
  //   { id: 'e709953d-4871-4d1a-b0ae-94ef429cf5c9' },
  //   { id: '65c9c51d-6fee-4687-8ace-0b4b0f036a91' },
  //   { id: 'db1537ed-556e-4bd8-be81-ea01c9011c73' }
  // ]

  const tenant = users.find((user) => user.email === 'tenant@gmail.com');

  return knex('requests')
    .del()
    .then(function () {
      return knex('requests').insert([
        {
          userId: tenant.id,
          orgId: 1,
          addressId: 1,
        },
      ]);
    });
};
