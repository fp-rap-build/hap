exports.up = function (knex, Promise) {
    return knex.schema.raw("SELECT * FROM requests")
  };
  
  exports.down = function (knex, Promise) {
    return knex.schema.raw("SELECT * FROM requests")
  };
  