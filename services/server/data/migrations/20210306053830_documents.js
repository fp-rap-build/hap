exports.up = function (knex) {
  return knex.schema.createTable('documents', (tbl) => {
    tbl.increments();
    tbl.integer('requestId').notNullable().references('id').inTable('requests');
    tbl.string('name');
    tbl.string('type');
    tbl.string('location').notNullable();
    tbl.string('key').notNullable();
    tbl.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('documents');
};
