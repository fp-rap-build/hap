exports.up = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.integer('monthlyRent');
  });
};

exports.down = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.dropColumn('monthlyRent');
  });
};
