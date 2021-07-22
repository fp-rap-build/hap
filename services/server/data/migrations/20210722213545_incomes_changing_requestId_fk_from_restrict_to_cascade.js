exports.up = function (knex) {
    return knex.schema
      .table('incomes', (tbl) => {
        tbl.dropForeign('requestId', 'incomes_requestid_foreign');
      })
      .then(() =>
        knex.schema
          .table('incomes', (tbl) => {
            tbl
              .foreign('requestId')
              .references('requests.id')
              .onDelete('CASCADE')
              .onUpdate('CASCADE');
          })
      );
  };
  
  exports.down = function (knex) {
    return knex.schema
    .table('incomes', (tbl) => {
        tbl.dropForeign('requestId', 'incomes_requestid_foreign');
      })
    .then(() =>
      knex.schema
        .table('incomes', (tbl) => {
          tbl
            .foreign('requestId')
            .references('requests.id')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT');
        })
    );
  };
  