exports.up = function (knex) {
    return knex.schema.table('payments', (tbl) => {
      tbl.float('amountBack').defaultTo(0.00);
      tbl.float('amountForward').defaultTo(0.00);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('payments', (tbl) => {
      tbl.dropColumn('amountBack');
      tbl.dropColumn('amountForward');
    });
  };
  