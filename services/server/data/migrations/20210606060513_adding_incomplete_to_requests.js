exports.up = function (knex) {
    return knex.schema.table('requests', (tbl) => {
      tbl.boolean('incomplete').defaultTo(false);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('requests', (tbl) => {
      tbl.dropColumn('incomplete');
    });
  };