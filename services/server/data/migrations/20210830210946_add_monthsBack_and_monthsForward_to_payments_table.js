exports.up = function (knex) {
    return knex.schema.table('payments', (tbl) => {
<<<<<<< HEAD
      tbl.integer('monthsBack');
      tbl.integer('monthsForward');
=======
      tbl.integer('monthsBack').defaultTo(0);
      tbl.integer('monthsForward').defaultTo(0);
>>>>>>> main

    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('payments', (tbl) => {
      tbl.dropColumn('monthsBack');
      tbl.dropColumn('monthsForward');

    });
  };
  