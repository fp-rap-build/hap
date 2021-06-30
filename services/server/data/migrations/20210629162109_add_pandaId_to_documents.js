exports.up = function (knex) {
  return knex.schema.table('documents', (tbl) => {
    tbl.string('pandaId').defaultsTo(null);
  });
};

exports.down = function (knex) {
  return knex.schema.table('documents', (tbl) => {
    tbl.dropColumn('pandaId');
  });
};
