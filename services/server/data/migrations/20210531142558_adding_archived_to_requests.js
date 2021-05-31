exports.up = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.boolean('archived').defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.dropColumn('archived');
  });
};
