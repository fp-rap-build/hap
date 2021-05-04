exports.up = function (knex) {
  return knex.schema.createTable('userNotifications', (tbl) => {
    tbl.increments();
    tbl
      .integer('requestId')
      .references('id')
      .inTable('requests')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    tbl
      .uuid('userId')
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    tbl.boolean('seen').defaultTo(false);

    tbl.string('message').notNullable();

    tbl.date('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('rnotifications');
};
