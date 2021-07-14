exports.up = function (knex, Promise) {
    return knex.schema.raw(`
          ALTER TABLE requests ALTER column "amountRequested" TYPE decimal(10,2);
          ALTER TABLE requests ALTER column "owed" TYPE decimal(10,2);
          `);
  };
  
  exports.down = function (knex, Promise) {
    return knex.schema.raw(`
    ALTER TABLE requests ALTER column "amountRequested" TYPE integer;
    ALTER TABLE requests ALTER column "owed" TYPE integer;
          `);
  };
  