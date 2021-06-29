exports.up = function (knex) {
    return knex.schema.createTable('ages', (tbl) => {
      tbl.increments('id');
      tbl.uuid('userId').notNullable().references('id').inTable('users');
      tbl.integer('age').defaultsTo(-1);
      tbl.enum('role', ['headOfHousehold', 'adult', 'child']).notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('ages');
  };
