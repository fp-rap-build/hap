exports.up = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.timestamp('latestTenantActivity');
    tbl.timestamp('latestStaffActivity');
  });
};

exports.down = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.dropColumn('latestTenantActivity');
    tbl.dropColumn('latestStaffActivity');
  });
};
