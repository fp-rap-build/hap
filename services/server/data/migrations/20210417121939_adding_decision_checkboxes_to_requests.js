exports.up = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.boolean('verifiedLedger').defaultsTo(false);
    tbl.boolean('checkRequested').defaultTo(false);
    tbl.boolean('checkSent').defaultTo(false);
    tbl.boolean('checkReceived').defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.dropColumn('verifiedLedger');
    tbl.dropColumn('checkRequested');
    tbl.dropColumn('checkSent');
    tbl.dropColumn('checkReceived');
  });
};
