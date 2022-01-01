exports.up = function (knex) {
  return knex.schema.table('payments', (tbl) => {
    tbl.text('utilityProviderName');
    tbl.text('utilityProviderAddress');
  });
};

exports.down = function (knex) {
  return knex.schema.table('payments', (tbl) => {
    tbl.dropColumn('utilityProviderName');
    tbl.dropColumn('utilityProviderAddress');
  });
};
