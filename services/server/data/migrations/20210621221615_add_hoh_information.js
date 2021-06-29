exports.up = function (knex) {
    return knex.schema.table('requests', (tbl) => {
        tbl.integer('beds');
        tbl.boolean('hispanicHOH');
        tbl.boolean('asianHOH');
        tbl.boolean('blackHOH');
        tbl.boolean('pacificHOH');
        tbl.boolean('whiteHOH');
        tbl.boolean('nativeHOH');
        tbl.boolean('demoNotSayHOH');
        tbl.string('gender');
        tbl.date('dob');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('requests', (tbl) => {
      tbl.dropColumn('beds');
      tbl.dropColumn('hispanicHOH');
      tbl.dropColumn('asianHOH');
      tbl.dropColumn('blackHOH');
      tbl.dropColumn('pacificHOH');
      tbl.dropColumn('whiteHOH');
      tbl.dropColumn('nativeHOH');
      tbl.dropColumn('demoNotSayHOH');
      tbl.dropColumn('gender');
      tbl.dropColumn('dob');
      
    });
  };