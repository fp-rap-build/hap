const cleaner = require('knex-cleaner');

exports.seed = function (knex) {
  return cleaner.clean(knex, {
    mode: 'truncate', //resets our ids
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'], //do not want to empty migration tables
  });
};
