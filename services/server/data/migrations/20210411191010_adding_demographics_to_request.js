exports.up = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.boolean('hispanic').defaultsTo(false);
    tbl.boolean('asian').defaultTo(false);
    tbl.boolean('black').defaultTo(false);
    tbl.boolean('pacific').defaultTo(false);
    tbl.boolean('white').defaultTo(false);
    tbl.boolean('native').defaultTo(false);
    tbl.boolean('demoNotSay').defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.table('requests', (tbl) => {
    tbl.dropColumn('hispanic');
    tbl.dropColumn('asian');
    tbl.dropColumn('black');
    tbl.dropColumn('pacific');
    tbl.dropColumn('white');
    tbl.dropColumn('native');
    tbl.dropColumn('demoNotSay');
  });
};
