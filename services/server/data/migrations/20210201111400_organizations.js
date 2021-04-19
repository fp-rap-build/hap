exports.up = function (knex) {
  return knex.schema.createTable('organizations', (tbl) => {
    tbl.increments('id');
    tbl.string('organization');
    tbl.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('organizations');
};
