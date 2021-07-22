exports.up = function (knex) {
    return knex.schema
      .table('ages', (tbl) => {
        tbl.dropForeign('userId', 'ages_userid_foreign');
      })
      .then(() =>
        knex.schema
          .table('ages', (tbl) => {
            tbl
              .foreign('userId')
              .references('users.id')
              .onDelete('CASCADE')
              .onUpdate('CASCADE');
          })
      );
  };
  
  exports.down = function (knex) {
    return knex.schema
    .table('ages', (tbl) => {
      tbl.dropForeign('userId', 'ages_userid_foreign');
    })
    .then(() =>
      knex.schema
        .table('ages', (tbl) => {
          tbl
            .foreign('userId')
            .references('users.id')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT');
        })
    );
  };
  