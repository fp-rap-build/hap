exports.up = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.string('childrenAges');
  });
};

exports.down = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.dropColumn('childrenAges');
  });
};
