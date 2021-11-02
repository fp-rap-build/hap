exports.up = function(knex, Promise) {
	return knex.schema.raw(`
          ALTER TABLE "documents" DROP CONSTRAINT "documents_category_check";
          ALTER TABLE "documents" ADD CONSTRAINT "documents_category_check" CHECK ("category" IN ('residency'::text, 'income'::text, 'housingInstability'::text, 'covid'::text ,'other'::text, 'childrenOrPregnancy'::text, 'identity'::text, 'landlordW9'::text, 'rpaf'::text, 'upaf'::text, 'utilBills'::text, 'lateNotice'::text, 'lease'::text ))
        `);
};

// The reverse migration is similar
exports.down = function(knex, Promise) {
	return knex.schema.raw(`
    ALTER TABLE "documents" DROP CONSTRAINT "documents_category_check";
    ALTER TABLE "documents" ADD CONSTRAINT "documents_category_check" CHECK ("category" IN ('residency'::text, 'income'::text, 'housingInstability'::text, 'covid'::text ,'other'::text, 'childrenOrPregnancy'::text, 'identity'::text, 'landlordW9'::text, 'rpaf'::text, 'upaf'::text, 'lateNotice'::text, 'lease'::text ))
        `);
};
