exports.up = function (knex) {
    return knex.schema.table('payments', (tbl) => {
      tbl.integer('monthsBack');
      tbl.integer('monthsForward');

    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('payments', (tbl) => {
      tbl.dropColumn('monthsBack');
      tbl.dropColumn('monthsForward');

    });
  };
  