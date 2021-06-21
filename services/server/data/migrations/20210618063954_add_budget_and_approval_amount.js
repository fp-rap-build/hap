exports.up = function (knex) {
    return knex.schema.table('requests', (tbl) => {
      tbl.string('budget');
      tbl.integer('amountApproved');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('requests', (tbl) => {
      tbl.dropColumn('budget');
      tbl.dropColumn('amountApproved');
    });
  };