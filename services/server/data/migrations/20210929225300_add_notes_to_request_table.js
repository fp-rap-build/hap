exports.up = function (knex) {
    return knex.schema.table('requests', (tbl) => {
      tbl.string('notes');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('requests', (tbl) => {
      tbl.dropColumn('notes');
    });
  };
  