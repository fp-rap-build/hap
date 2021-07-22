exports.up = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.dropColumn('gender');
    tbl.dropColumn('dob');
  });
};

exports.down = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.string('gender');
    tbl.date('dob');
  });
};
