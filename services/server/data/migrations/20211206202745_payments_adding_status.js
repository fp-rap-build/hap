exports.up = function (knex) {
  return knex.schema.table('payments', (tbl) => {
    tbl
      .enu('status', ['pending', 'denied', 'approved'])
      .notNullable()
      .defaultsTo('pending');
  });
};

exports.down = function (knex) {
  return knex.schema.table('payments', (tbl) => {
    tbl.dropColumn('status');
  });
};
