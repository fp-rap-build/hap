exports.up = function (knex) {
  return knex.schema.table('users', (tbl) => {
    tbl
      .enu('applicationStep', [
        'landlord',
        'address',
        'household',
        'demographics',
        'documents',
        'review',
        'completed',
      ])
      .defaultTo('landlord');
  });
};

exports.down = function (knex) {
  return knex.schema.table('users', (tbl) => {
    tbl.dropColumn('applicationStep');
  });
};
