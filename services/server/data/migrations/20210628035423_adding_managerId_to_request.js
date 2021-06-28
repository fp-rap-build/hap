exports.up = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.uuid('managerId').nullable().references('id').inTable('users');
  });
};

exports.down = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.dropColumn('managerId');
  });
};
