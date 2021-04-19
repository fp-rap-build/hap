exports.up = function (knex) {
  return knex.schema.table('addresses', (tbl) => {
    tbl.string('addressLine2');
  });
};

exports.down = function (knex) {
  return knex.schema.table('addresses', (tbl) => {
    tbl.dropColumn('addressLine2');
  });
};
