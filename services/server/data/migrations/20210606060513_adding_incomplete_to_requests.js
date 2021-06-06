exports.up = function (knex) {
    return knex.schema.table('requests', (tbl) => {
      tbl.boolean('incomplete').defaultTo(true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('requests', (tbl) => {
      tbl.dropColumn('incomplete');
    });
  };