exports.up = function (knex) {
    return knex.schema.table('payments', (tbl) => {
      tbl.float('totalArrears').defaultTo(0.00);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('payments', (tbl) => {
      tbl.dropColumn('totalArrears');
    });
  };
  