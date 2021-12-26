
exports.up = function(knex) {
  return knex.raw(`ALTER TABLE ONLY payments ALTER COLUMN status SET DEFAULT 'pending'`)
};

exports.down = function(knex) {
    return knex.raw(`ALTER TABLE ONLY payments ALTER COLUMN status SET DEFAULT 'approved'`)
};
