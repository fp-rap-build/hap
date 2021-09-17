exports.up = function (knex) {
  return knex.raw(`ALTER TABLE requests ALTER COLUMN "familySize" SET DEFAULT null;
                   ALTER TABLE requests ALTER COLUMN "numChildren" SET DEFAULT null;
                   ALTER TABLE requests ALTER COLUMN owed SET DEFAULT null;
                   ALTER TABLE requests ALTER COLUMN "totalChildren" SET DEFAULT null;
                   ALTER TABLE requests ALTER COLUMN "amountRequested" SET DEFAULT null;
                  `);
};

exports.down = function (knex) {
  return knex.raw(`
    ALTER TABLE requests ALTER COLUMN familySize SET DEFAULT 0;
    ALTER TABLE requests ALTER COLUMN numChildren SET DEFAULT 0;
    ALTER TABLE requests ALTER COLUMN owed SET DEFAULT 0;
    ALTER TABLE requests ALTER COLUMN totalChildren SET DEFAULT 0;
    ALTER TABLE requests ALTER COLUMN amountRequested SET DEFAULT 0;
   `);
};
