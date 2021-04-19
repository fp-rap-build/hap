exports.up = function (knex) {
  return knex.schema.createTable('comments', (tbl) => {
    tbl.increments('id');
    tbl.integer('requestId').references('id').inTable('requests');
    tbl.uuid('authorId').references('id').inTable('users');
    tbl.text('comment').notNullable();
    //Times stored using 24hr format i.e '2021-03-21 17:00:00'
    tbl.timestamp('createdAt');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('comments');
};
