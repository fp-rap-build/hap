exports.up = function (knex) {
  return knex.schema.table('users', (tbl) => {
    tbl
      .enu('role', [
        'pending',
        'tenant',
        'landlord',
        'assistantProgramManager',
        'programManager',
        'orgAdmin',
        'admin',
      ])
      .notNullable()
      .defaultsTo('pending');
  });
};

exports.down = function (knex) {
  return knex.schema.table('users', (tbl) => {
    tbl.dropColumn('role');
  });
};
