exports.up = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.integer('amountRequested').defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.dropColumn('amountRequested');
  });
};
