exports.up = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.integer('totalChildren').defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.dropColumn('totalChildren');
  });
};
