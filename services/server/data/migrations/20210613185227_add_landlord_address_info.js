exports.up = function (knex) {
    return knex.schema.table('requests', (tbl) => {
      tbl.string('landlordAddress');
      tbl.string('landlordAddress2');
      tbl.string('landlordCity');
      tbl.string('landlordState');
      tbl.string('landlordZip');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('requests', (tbl) => {
      tbl.dropColumn('landlordAddress');
      tbl.dropColumn('landlordAddress2');
      tbl.dropColumn('landlordCity');
      tbl.dropColumn('landlordState');
      tbl.dropColumn('landlordZip');
    });
  };
  