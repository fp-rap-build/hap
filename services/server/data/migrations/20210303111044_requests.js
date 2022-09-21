exports.up = function (knex) {
  return knex.schema.createTable('requests', (tbl) => {
    tbl.increments('id');
    tbl.uuid('userId').notNullable().references('id').inTable('users');

    tbl
      .enu('requestStatus', [
        'received',
        'inReview',
        'pending',
        'approved',
        'denied',
        'landlorddenied',
      ])
      .notNullable()
      .defaultsTo('received');
    tbl.integer('orgId').references('id').inTable('organizations');
    tbl.integer('familySize').defaultsTo(0);
    tbl.integer('numChildren').defaultsTo(0);
    tbl.integer('monthlyIncome').unsigned();
    tbl.integer('addressId').unsigned().references('id').inTable('addresses');
    tbl.boolean('apmApproval').defaultsTo(false);
    tbl.boolean('pmApproval').defaultsTo(false);
    tbl.boolean('bookKeeperApproval').defaultsTo(false);
    tbl.boolean('headAcctApproval').defaultsTo(false);
    tbl.boolean('adminApproval').defaultsTo(false);
    tbl.date('requestDate').defaultsTo(knex.raw('current_date'));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('requests');
};
