exports.up = function (knex) {
  return knex.schema.table('payments', (tbl) => {
    tbl.text('providerName');
    tbl.text('providerAddress');
  });
};

exports.down = function (knex) {
  return knex.schema.table('payments', (tbl) => {
    tbl.dropColumn('providerName');
    tbl.dropColumn('providerAddress');
  });
};
