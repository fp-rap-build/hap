exports.up = function (knex, Promise) {
  return knex.schema.raw(`
         ALTER TABLE documents ALTER COLUMN category SET DEFAULT 'other';
         ALTER TABLE documents ALTER COLUMN status SET DEFAULT 'received';
      `);
};

exports.down = function (knex, Promise) {
  return knex.schema.raw(`
        ALTER TABLE documents ALTER COLUMN category SET DEFAULT null;
        ALTER TABLE documents ALTER COLUMN status SET DEFAULT null;
      `);
};
