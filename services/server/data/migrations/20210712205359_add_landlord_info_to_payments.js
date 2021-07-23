exports.up = function (knex, Promise) {
    return knex.schema.raw("SELECT * FROM payments")
  };
  
  exports.down = function (knex, Promise) {
    return knex.schema.raw("SELECT * FROM payments")
  };
  