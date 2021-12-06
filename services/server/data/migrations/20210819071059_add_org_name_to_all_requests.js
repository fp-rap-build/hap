exports.up = function (knex) {
  return knex.schema.raw('SELECT * FROM requests');
};

exports.down = function (knex) {
  return knex.schema.raw('SELECT * FROM requests');
};
