exports.up = function (knex) {
    return knex.schema.table('payments', (tbl) => {
      tbl.string('utilityProviderName');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('payments', (tbl) => {
      tbl.dropColumn('utilityProviderName');
    });
  };
  