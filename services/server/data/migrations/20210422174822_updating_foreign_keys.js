exports.up = function (knex) {
  return knex.schema
    .table('documents', (tbl) => {
      tbl.dropForeign('requestId', 'documents_requestid_foreign');
    })
    .then(() =>
      knex.schema.table('comments', (tbl) => {
        tbl.dropForeign('requestId', 'comments_requestid_foreign');
      })
    )
    .then(() =>
      knex.schema.table('payments', (tbl) => {
        tbl.dropForeign('requestId', 'payments_requestid_foreign');
      })
    )
    .then(() =>
      knex.schema
        .table('documents', (tbl) => {
          tbl
            .foreign('requestId')
            .references('requests.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        })
        .then(() =>
          knex.schema.table('comments', (tbl) => {
            tbl
              .foreign('requestId')
              .references('requests.id')
              .onDelete('CASCADE')
              .onUpdate('CASCADE');
          })
        )
        .then(() =>
          knex.schema.table('payments', (tbl) => {
            tbl
              .foreign('requestId')
              .references('requests.id')
              .onDelete('CASCADE')
              .onUpdate('CASCADE');
          })
        )
    );
};

exports.down = function (knex) {};
