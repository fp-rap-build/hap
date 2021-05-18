exports.up = function(knex, Promise) {
    return knex.schema.raw(`
      ALTER TABLE "requests" DROP CONSTRAINT "requests_requestStatus_check";
      ALTER TABLE "requests" ADD CONSTRAINT "requests_requestStatus_check" CHECK (requestStatus IN ('HYBRID'::text, 'ELECTRIC'::text, 'PETROL'::text, 'DIESEL'::text))
    `);
  };
  
  // The reverse migration is similar
  exports.down = function(knex, Promise) {
    return knex.schema.raw(`
      ALTER TABLE "requests" DROP CONSTRAINT "requestStatus_type";
      ALTER TABLE "requests" ADD CONSTRAINT "requestStatus_type" CHECK (requestStatus IN ('PETROL'::text, 'DIESEL'::text, 'CNG'::text));
    `);
  };
  
