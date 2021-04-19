exports.up = function (knex) {
  return knex.schema.createTable('addresses', (tbl) => {
    tbl.increments('id');
    tbl.string('address', 256);
    tbl.string('cityName', 30);
    tbl.string('state', 25);
    tbl.integer('zipCode');
    tbl.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('addresses');
};
