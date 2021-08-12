exports.up = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.boolean('covidFH').defaultTo(false);
    tbl.boolean('qualifiedForUnemployment').defaultTo(false);
    tbl.boolean('proofOfRisk').defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.dropColumn('covidFH');
    tbl.dropColumn('qualifiedForUnemployment');
    tbl.dropColumn('proofOfRisk');
  });
};
