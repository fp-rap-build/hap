exports.up = function (knex) {
  return knex.schema.table('payments', (tbl) => {
    tbl.enu('type', ['rental', 'utility']).defaultTo('rental');
    tbl.enu('renterOrOwner', ['renter', 'owner']);
    tbl.string('accountNumber');
  });
};

exports.down = function (knex) {
  return knex.schema.table('payments', (tbl) => {
    tbl.dropColumn('type');
    tbl.dropColumn('renterOrOwner');
    tbl.dropColumn('accountNumber');
  });
};
