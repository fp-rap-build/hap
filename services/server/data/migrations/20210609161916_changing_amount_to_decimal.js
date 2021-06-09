exports.up = function (knex) {
  return knex.schema.raw(
    'ALTER table payments ALTER column amount type decimal(10,2)'
  );
};

exports.down = function (knex) {
  return knex.schema.raw(
    'ALTER table payments ALTER column amount type integer'
  );
};
