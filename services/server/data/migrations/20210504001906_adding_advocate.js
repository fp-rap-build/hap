exports.up = function (knex) {
    return knex.schema.table('requests', (tbl) => {
        tbl.boolean('advocate')
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('requests', (tbl) => {
      tbl.dropColumn('advocate');
    });
  };