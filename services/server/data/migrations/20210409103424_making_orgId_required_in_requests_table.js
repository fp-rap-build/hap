exports.up = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl
      .integer('orgId')
      .references('id')
      .inTable('organizations')
      .notNullable()
      .defaultsTo(1);
  });
};

exports.down = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.dropColumn('orgId');
  });
};
