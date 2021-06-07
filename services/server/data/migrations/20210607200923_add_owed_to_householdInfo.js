exports.up = function (knex) {
    return knex.schema.table('requests', (tbl) => {
      tbl.integer('owed').defaultTo(0);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('requests', (tbl) => {
      tbl.dropColumn('owed');
    });
  };
  