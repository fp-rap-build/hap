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
          password: bcrypt.hashSync('testpassword', process.env.BCRYPT_SALT),
          role: 'admin',
          organizationId: 1,
        },
        {
          email: 'orgAdmin@gmail.com',
          firstName: 'Tommy',
          lastName: 'Shelby',
          password: bcrypt.hashSync('testpassword', process.env.BCRYPT_SALT),
          role: 'orgAdmin',
          organizationId: 1,
        },
        {
          email: 'programManager@gmail.com',
          firstName: 'Tommy',
          lastName: 'Shelby',
          password: bcrypt.hashSync('testpassword', process.env.BCRYPT_SALT),
          role: 'programManager',
          organizationId: 1,
        },
        {
          email: 'assistantProgramManager@gmail.com',
          firstName: 'Tommy',
          lastName: 'Shelby',
          password: bcrypt.hashSync('testpassword', process.env.BCRYPT_SALT),
          role: 'assistantProgramManager',
          organizationId: 1,
        },
        {
          email: 'landlord@gmail.com',
          firstName: 'John',
          lastName: 'Shelby',
          password: bcrypt.hashSync('testpassword', process.env.BCRYPT_SALT),
          role: 'landlord',
        },
        {
          email: 'tenant@gmail.com',
          firstName: 'Billy',
          lastName: 'Kimber',
          password: bcrypt.hashSync('testpassword', process.env.BCRYPT_SALT),
          role: 'tenant',
        },
      ]);
    });
};
