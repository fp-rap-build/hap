exports.up = function (knex, Promise) {
  return knex.schema.raw(`
          ALTER TABLE "documents" DROP CONSTRAINT "documents_status_check";
          ALTER TABLE "documents" ADD CONSTRAINT "documents_status_check" CHECK ("status" IN ('received'::text, 'verified'::text, 'denied'::text, 'actionsRequired'::text ,'optOut'::text))
        `);
};

// The reverse migration is similar
exports.down = function (knex, Promise) {
  return knex.schema.raw(`
          ALTER TABLE "documents" DROP CONSTRAINT "documents_status_check";
          ALTER TABLE "documents" ADD CONSTRAINT "documents_status_check" CHECK ("status" IN ('received'::text, 'verified'::text, 'denied'::text,'optOut'::text))
        `);
};
