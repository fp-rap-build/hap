exports.up = function (knex) {
  return knex.schema.table('users', (tbl) => {
    tbl.dropColumn('role');
  });
};

exports.down = function (knex) {
  return knex.schema.table('users', (tbl) => {
    tbl
      .enu('role', ['pending', 'tenant', 'landlord', 'admin', 'programManager'])
      .notNullable()
      .defaultsTo('pending');
  });
};
