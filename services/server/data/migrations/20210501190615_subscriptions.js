exports.up = function (knex) {
  return knex.schema.createTable('subscriptions', (tbl) => {
    tbl.increments();
    tbl
      .integer('requestId')
      .unsigned()
      .references('id')
      .inTable('requests')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .notNullable();
    tbl
      .uuid('userId')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('subscriptions');
};
