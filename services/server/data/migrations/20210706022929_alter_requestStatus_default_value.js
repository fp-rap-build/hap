exports.up = function (knex) {
  return knex.schema.raw(`
    ALTER TABLE requests ALTER COLUMN "requestStatus" SET DEFAULT 'documentsNeeded';
  `);
};

exports.down = function (knex) {
  return knex.schema.raw(`
  ALTER TABLE requests ALTER COLUMN "requestStatus" SET DEFAULT 'received';
`);
};
