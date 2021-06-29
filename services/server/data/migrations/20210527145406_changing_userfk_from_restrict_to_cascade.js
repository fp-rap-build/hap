exports.up = function (knex) {
  return knex.schema
    .table('requests', (tbl) => {
      tbl.dropForeign('userId', 'requests_userid_foreign');
    })
    .then(() =>
      knex.schema.table('comments', (tbl) => {
        tbl.dropForeign('authorId', 'comments_authorid_foreign');
      })
    )
    .then(() =>
      knex.schema.table('payments', (tbl) => {
        tbl.dropForeign('payerId', 'payments_payerid_foreign');
      })
    )
    .then(() =>
      knex.schema
        .table('requests', (tbl) => {
          tbl
            .foreign('userId')
            .references('users.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        })
        .then(() =>
          knex.schema.table('comments', (tbl) => {
            tbl
              .foreign('authorId')
              .references('users.id')
              .onDelete('CASCADE')
              .onUpdate('CASCADE');
          })
        )
        .then(() =>
          knex.schema.table('payments', (tbl) => {
            tbl
              .foreign('payerId')
              .references('users.id')
              .onDelete('CASCADE')
              .onUpdate('CASCADE');
          })
        )
    );
};

exports.down = function (knex) {};
