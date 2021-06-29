const bcrypt = require('bcryptjs');

const salt = Number(process.env.BCRYPT_SALT)

exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(function () {
      return knex('users').insert([
        {
          email: 'admin@gmail.com',
          firstName: 'Tommy',
          lastName: 'Shelby',
          password: bcrypt.hashSync('testpassword', salt),
          role: 'admin',
          organizationId: 1,
        },
        {
          email: 'orgadmin@gmail.com',
          firstName: 'Tommy',
          lastName: 'Shelby',
          password: bcrypt.hashSync('testpassword', salt),
          role: 'orgAdmin',
          organizationId: 1,
        },
        {
          email: 'programmanager@gmail.com',
          firstName: 'Tommy',
          lastName: 'Shelby',
          password: bcrypt.hashSync('testpassword', salt),
          role: 'programManager',
          organizationId: 1,
        },
        {
          email: 'assistantprogrammanager@gmail.com',
          firstName: 'Tommy',
          lastName: 'Shelby',
          password: bcrypt.hashSync('testpassword', salt),
          role: 'assistantProgramManager',
          organizationId: 1,
        },
        {
          email: 'landlord@gmail.com',
          firstName: 'John',
          lastName: 'Shelby',
          password: bcrypt.hashSync('testpassword', salt),
          role: 'landlord',
        },
        {
          email: 'tenant@gmail.com',
          firstName: 'Billy',
          lastName: 'Kimber',
          password: bcrypt.hashSync('testpassword', salt),
          role: 'tenant',
        },
      ]);
    });
};
