const { TokenFileWebIdentityCredentials } = require('aws-sdk');

exports.up = function (knex) {
  return knex.schema.createTable('incomes', (tbl) => {
    tbl.increments();

    tbl
      .integer('requestId')
      .unsigned()
      .references('id')
      .inTable('requests')
      .onDelete('RESTRICT')
      .onUpdate('RESTRICT')
      .notNullable();

    tbl.string('name', 128).notNullable();

    tbl.integer('amount').unsigned().notNullable();

    tbl
      .enu('sourceOfIncome', [
        'wages',
        'publicAssistance',
        'pensionRetirement',
        'unemploymentDissablity',
        'alimony',
      ])
      .notNullable();

    tbl.enu('payPeriod', ['weekly', 'biweekly', 'monthly']).notNullable();

    //Annualized Income???
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('incomes');
};
