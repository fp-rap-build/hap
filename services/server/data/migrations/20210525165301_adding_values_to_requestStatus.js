exports.up = function (knex, Promise) {
  return knex.schema.raw(`
      ALTER TABLE "requests" DROP CONSTRAINT "requests_requestStatus_check";
      ALTER TABLE "requests" ADD CONSTRAINT "requests_requestStatus_check" CHECK ("requestStatus" IN ('pending'::text, 'received'::text, 'notResponding'::text, 'inReview'::text ,'documentsNeeded'::text, 'verifyingDocuments'::text, 'readyForReview'::text, 'approved'::text, 'denied'::text, 'landlordDenied'::text))
    `);
};

// The reverse migration is similar
exports.down = function (knex, Promise) {
  return knex.schema.raw(`
      select * from requests
    `);
};
