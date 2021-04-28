exports.up = function (knex) {
  return knex.schema.createTable('contact', (tbl) => {
    tbl.increments();

    tbl
      .integer('requestId')
      .unsigned()
      .references('id')
      .inTable('requests')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .notNullable();

    tbl.string('tenantNumber');
    tbl.string('tenantEmail');
    tbl.string('landlordNumber');
    tbl.string('landlordEmail');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('contact');
};
