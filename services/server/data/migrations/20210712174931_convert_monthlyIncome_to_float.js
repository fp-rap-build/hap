exports.up = function (knex, Promise) {
  return knex.schema.raw(`
          ALTER TABLE requests ALTER column "monthlyIncome" TYPE decimal(10,2);
          `);
};

exports.down = function (knex, Promise) {
  return knex.schema.raw(`
    ALTER TABLE requests ALTER column "monthlyIncome" TYPE integer;
          `);
};
