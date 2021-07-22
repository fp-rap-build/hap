exports.up = function (knex) {
  return knex.schema.table('documents', (tbl) => {
    tbl.enu('category', [
      'residency',
      'income',
      'housingInstability',
      'covid',
      'other',
    ]);
    tbl.enu('status', ['received', 'optOut', 'verified', 'denied']);
  });
};

exports.down = function (knex) {
  return knex.schema.table('documents', (tbl) => {
    tbl.dropColumn('category');
    tbl.dropColumn('status');
  });
};
