exports.up = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.dropColumn('orgId');
  });
};

exports.down = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.integer('orgId').references('id').inTable('organizations');
  });
};
