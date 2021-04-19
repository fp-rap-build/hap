exports.up = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.boolean('unEmp90').defaultTo(false);
    tbl.boolean('foodWrkr').defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.dropColumn('unEmp90');
    tbl.dropColumn('foodWrkr');
  });
};
