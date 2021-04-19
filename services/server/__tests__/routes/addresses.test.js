const db = require('../../data/db-config');
const Addr = require('../../api/routes/addresses/addr-model');
const { seed } = require('../../data/seeds/01-addresses');
const { expectedAudience } = require('../../config/okta');

//Mock Data:
const addrs = [
  {
    address: '904 E. Hartson Ave',
    cityName: 'Spokane',
    state: 'WA',
    zipCode: 99202,
  },
  {
    address: '123 Mystery Lane',
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
];

//Organize DB
// !! Ideally move migrate and rollback to before All - this is slowing the test down
//Find a way around foreign key constraint when truncating addresses

beforeAll(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

//CRUD Tests
describe('Address Model', () => {
  describe('CRUD Operations', () => {
    it('should insert provided addresses into the db', async () => {
      const seedAddrs = await Addr.findAll();
      const initialLength = seedAddrs.length;

      await Addr.create(addrs[0]);
      const newAddrs = await Addr.findAll();

      expect(newAddrs.length).toBeGreaterThan(initialLength);
    });
    it('should update address and return success responce', async () => {
      await Addr.create(addrs[0]);
      const updated = await Addr.update(1, addrs[1]);

      // 1 is the success response - this is worth fixing
      expect(updated.length).toBe(1);
    });
    it('should delete address', async () => {
      await Addr.create(addrs[0]);
      await Addr.remove(5);

      const addrLength = await Addr.findAll();

      expect(addrLength.length).toBe(6);
    });
    it('should find address by id', async () => {
      const foundById = await Addr.findBy({ id: 1 });

      expect(foundById).toHaveLength(1);
    });
  });
});
