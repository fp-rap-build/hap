exports.up = function (knex, Promise) {
  return knex.schema.raw(`
  UPDATE requests SET "landlordEmail"=lower("landlordEmail")
  `);
};

// The reverse migration is similar
exports.down = function (knex, Promise) {
  return knex.schema.raw(`
    select * from requests
  `);
};
