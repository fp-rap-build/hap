exports.up = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.string('advocateName');
    tbl.string('advocateEmail');
    tbl.string('advocatePhone');
    tbl.string('advocateOrg');
  });
};

exports.down = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.dropColumn('advocateName');
    tbl.dropColumn('advocateEmail');
    tbl.dropColumn('advocatePhone');
    tbl.dropColumn('advocateOrg');
  });
};
