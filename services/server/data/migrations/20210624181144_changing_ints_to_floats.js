exports.up = function (knex, Promise) {
  return knex.schema.raw(`
        ALTER TABLE programs ALTER column budget TYPE decimal(10,2);
        ALTER TABLE payments ALTER COLUMN amount TYPE decimal(10,2);
        `);
};

exports.down = function (knex, Promise) {
  return knex.schema.raw(`
  ALTER TABLE programs ALTER column budget TYPE integer;
  ALTER TABLE payments ALTER COLUMN amount TYPE integer;
        `);
};
