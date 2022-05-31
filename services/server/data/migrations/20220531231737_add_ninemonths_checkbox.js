exports.up = function (knex) {
    return knex.schema.table('requests', (tbl) => {
      tbl.boolean('nineMonths').defaultTo(false);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('requests', (tbl) => {
      tbl.dropColumn('nineMonths');
    });
  };
