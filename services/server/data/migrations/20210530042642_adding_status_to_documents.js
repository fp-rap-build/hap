//Need to add Category Enum (the five we defined on the fron end)
//Need to add Status Enum (received, optOut, verified, denied)
//Write or find enpoint to edit document
//If they opt out pop out a modal that reads the form with a I Acknowledge etc. etc
// toggle status to optOut
//If docs good toggles status to received
//------------------------------------------------
//For status/ category trackingn handle on FE
//Write a list of the four categories - get all docs for the request
// show x/4 received, x/4 optOut, x/4 missing

exports.up = function (knex) {
  return knex.schema.table('documents', (tbl) => {
    tbl.enu('category', [
      'residency',
      'income',
      'housingInstability',
      'covid',
      'other',
    ]);
    tbl.enu('status', ['received', 'optOut', 'verified', 'denied']);
  });
};

exports.down = function (knex) {
  return knex.schema.table('documents', (tbl) => {
    tbl.dropColumn('category');
    tbl.dropColumn('status');
  });
};
