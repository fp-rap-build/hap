exports.up = function (knex) {
  return knex.schema.createTable('payments', (tbl) => {
    tbl.increments();
    tbl
      .uuid('payerId')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('RESTRICT')
      .onUpdate('RESTRICT')
      .notNullable();
    tbl
      .integer('programId')
      .unsigned()
      .references('id')
      .inTable('programs')
      .onDelete('RESTRICT')
      .onUpdate('RESTRICT')
      .notNullable();

    tbl
      .integer('requestId')
      .unsigned()
      .references('id')
      .inTable('requests')
      .onDelete('RESTRICT')
      .onUpdate('RESTRICT')
      .notNullable();

    tbl.integer('amount').unsigned().notNullable();

    tbl.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('payments');
};
