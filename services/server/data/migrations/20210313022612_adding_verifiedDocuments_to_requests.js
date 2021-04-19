exports.up = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.boolean('verifiedDocuments').defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.dropColumn('verifiedDocuments');
  });
};
