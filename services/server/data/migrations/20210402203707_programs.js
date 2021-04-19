exports.up = function (knex) {
  return knex.schema.createTable('programs', (tbl) => {
    tbl.increments();
    tbl
      .integer('organizationId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('organizations')
      .onDelete('RESTRICT')
      .onUpdate('RESTRICT');

    tbl.string('name', 128).notNullable();
    tbl.integer('budget').defaultTo(0);
    tbl.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('programs');
};
