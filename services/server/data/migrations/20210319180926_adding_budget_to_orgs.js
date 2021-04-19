exports.up = function (knex) {
  return knex.schema.table('organizations', (tbl) => {
    tbl.integer('budget').defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.table('organizations', (tbl) => {
    tbl.dropColumn('budget');
  });
};
