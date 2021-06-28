exports.up = function (knex) {
    return knex.schema.table('users', (tbl) => {
        tbl.string('gender');
        tbl.date('dob');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('users', (tbl) => {
      tbl.dropColumn('gender');
      tbl.dropColumn('dob');
      
    });
  };