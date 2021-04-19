exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('addresses')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('addresses').insert([
        {
          address: '904 E. Hartson Ave',
          cityName: 'Spokane',
          state: 'WA',
          zipCode: 99202,
        },
        {
          address: '904 E. Hartson Ave',
          cityName: 'Spokane',
          state: 'WA',
          zipCode: 99202,
        },
        {
          address: '904 E. Hartson Ave',
          cityName: 'Spokane',
          state: 'WA',
          zipCode: 99202,
        },
        {
          address: '904 E. Hartson Ave',
          cityName: 'Spokane',
          state: 'WA',
          zipCode: 99202,
        },
      ]);
    });
};
