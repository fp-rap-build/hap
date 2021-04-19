const db = require('../db-config');

exports.seed = async function (knex) {
  //see requests seed file for example response from db
  const users = await db('users')

  const programManager = users.find(user => user.email === 'programManager@gmail.com')
  const tenant = users.find(user => user.email === 'tenant@gmail.com')

  return knex('comments')
    .del()
    .then(function () {
      return knex('comments').insert([
        {
          requestId: 1,
          authorId: programManager.id,
          comment:
            'Hi Billy I received your requests and have a few questions!',
          createdAt: '2021-03-20 13:00:00',
          category: 'external',
        },
        {
          requestId: 1,
          authorId: tenant.id,
          comment: 'Great - What do you need from me?',
          createdAt: '2021-03-20 14:00:00',
          category: 'external',
        },
        {
          requestId: 1,
          authorId: programManager.id,
          comment: 'Internal Test Comment',
          createdAt: '2021-03-20 14:00:00',
          category: 'internal',
        },
      ]);
    });
};
