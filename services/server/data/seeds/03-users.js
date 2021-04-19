const bcrypt = require('bcryptjs');

exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(function () {
      return knex('users').insert([
        {
          email: 'admin@gmail.com',
          firstName: 'Tommy',
          lastName: 'Shelby',
          password: bcrypt.hashSync('testpassword', 1),
          role: 'admin',
          organizationId: 1,
        },
        {
          email: 'orgAdmin@gmail.com',
          firstName: 'Tommy',
          lastName: 'Shelby',
          password: bcrypt.hashSync('testpassword', 1),
          role: 'orgAdmin',
          organizationId: 1,
        },
        {
          email: 'programManager@gmail.com',
          firstName: 'Tommy',
          lastName: 'Shelby',
          password: bcrypt.hashSync('testpassword', 1),
          role: 'programManager',
          organizationId: 1,
        },
        {
          email: 'assistantProgramManager@gmail.com',
          firstName: 'Tommy',
          lastName: 'Shelby',
          password: bcrypt.hashSync('testpassword', 1),
          role: 'assistantProgramManager',
          organizationId: 1,
        },
        {
          email: 'landlord@gmail.com',
          firstName: 'John',
          lastName: 'Shelby',
          password: bcrypt.hashSync('testpassword', 1),
          role: 'landlord',
        },
        {
          email: 'tenant@gmail.com',
          firstName: 'Billy',
          lastName: 'Kimber',
          password: bcrypt.hashSync('testpassword', 1),
          role: 'tenant',
        },
      ]);
    });
};
