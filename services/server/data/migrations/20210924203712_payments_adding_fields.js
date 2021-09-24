exports.up = function (knex) {
  return knex.schema.table('payments', (tbl) => {
    tbl.enu('type', ['rental', 'utility'])
    tbl.boolean('owner');
    tbl.string('accountNumber');
  });
};

exports.down = function (knex) {
  return knex.schema.table('payments', (tbl) => {
    tbl.dropColumn('type');
    tbl.dropColumn('owner');
    tbl.dropColumn('accountNumber');
  });
};
