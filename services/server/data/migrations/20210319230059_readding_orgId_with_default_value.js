exports.up = function (knex) {
  return knex.schema.table('users', (tbl) => {
    tbl
      .integer('organizationId')
      .unsigned()
      .references('id')
      .inTable('organizations')
      .onDelete('RESTRICT')
      .onUpdate('RESTRICT')
      .defaultTo(1);
  });
};

exports.down = function (knex) {
  return knex.schema.table('users', (tbl) => {
    tbl.dropColumn('organizationId');
  });
};
