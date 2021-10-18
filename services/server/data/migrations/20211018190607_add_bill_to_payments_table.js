exports.up = function(knex) {
	return knex.schema.table('payments', (tbl) => {
		tbl.boolean('processed').defaultTo(false);
	});
};

exports.down = function(knex) {
	return knex.schema.table('payments', (tbl) => {
		tbl.dropColumn('processed');
	});
};
