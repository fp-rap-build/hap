exports.up = function (knex) {
  return knex.schema.createTable('rnotifications', (tbl) => {
    tbl.increments();
    tbl
      .integer('requestId')
      .references('id')
      .inTable('requests')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    tbl.string('message').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('rnotifications');
};
