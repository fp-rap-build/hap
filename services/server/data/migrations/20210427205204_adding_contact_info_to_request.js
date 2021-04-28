exports.up = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.string('tenantEmail');
    tbl.string('tenantNumber');
    tbl.string('landlordEmail');
    tbl.string('landlordNumber');
  });
};

exports.down = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.dropColumn('tenantNumber');
    tbl.dropColumn('tenantEmail');
    tbl.dropColumn('landlordNumber');
    tbl.dropColumn('landlordEmail');
  });
};
