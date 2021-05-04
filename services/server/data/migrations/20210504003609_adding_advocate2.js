exports.up = function (knex) {
    return knex.schema.table('requests', (tbl) => {
        tbl.boolean('advocate').defaultTo(false);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('requests', (tbl) => {
      tbl.dropColumn('advocate');
    });
  };