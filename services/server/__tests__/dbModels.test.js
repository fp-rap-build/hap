const db = require('../data/db-config');
const Addr = require('../api/routes/addresses/addr-model');
const Orgs = require('../api/routes/organizations/org-model');
const Users = require('../api/routes/users/userModel');

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

const testOrgs = [
  {
    organization: 'Test organization',
  },
  {
    organization: 'Non-Profit',
  },
];

const testUser = {
  email: 'test@gmail.com',
  firstName: 'Test',
  lastName: 'Test',
  password: 'testpassword',
  role: 'tenant',
};
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
    it('should update address and return success response', async () => {
      await Addr.create(addrs[0]);
      const updated = await Addr.update(1, addrs[1]);

      // 1 is the success response - this is worth fixing
      expect(updated.length).toBe(1);
    });
    it('should delete address', async () => {
      await Addr.create(addrs[0]);
      await Addr.remove(4);

      const addrLength = await Addr.findAll();

      expect(addrLength.length).toBe(6);
    });
    it('should find address by id', async () => {
      const foundById = await Addr.findBy({ id: 1 });

      expect(foundById).toHaveLength(1);
    });
  });
});

describe('Organization Model', () => {
  describe('Crud Operations', () => {
    it('should insert organization into db', async () => {
      await Orgs.create(testOrgs[0]);

      const allOrgs = await Orgs.findAll();

      expect(allOrgs.length).toBe(4);
    });
    it('should update organization and return success response', async () => {
      await Orgs.create(testOrgs[0]);

      const updateRes = await Orgs.update(4, testOrgs[1]);
      const updatedOrg = await Orgs.findById(4);

      expect(updateRes).toBe(1);
      expect(updatedOrg.organization).toBe('Non-Profit');
    });
    it('should delete target organization', async () => {
      await Orgs.create(testOrgs[0]);

      const deleteRes = await Orgs.remove(4);
      const allOrgs = await Orgs.findAll();

      expect(deleteRes).toBe(1);
      expect(allOrgs.length).toBe(5);
    });
    // it('should find organization by name', async () => {
    //   await Orgs.create(testOrgs[0]);

    //   const foundOrg = await Orgs.findBy({organization: 'Test organization'});

    //   expect(foundOrg.organization).toBe('Test organization');
    // });
  });
});

describe('Users Model', () => {
  describe('Crud Operations', () => {
    it('Should return all users', async () => {
      const allUsers = await Users.findAll();
      expect(allUsers.length).toBe(3);
    });
    it('Should add a user', async () => {
      await Users.create(testUser);
      const allUsers = await Users.findAll();
      expect(allUsers.length).toBe(4);
    });
    it('Should update a user', async () => {
      testUser['email'] = 'hello@gmaail.com';
      let newUser = await Users.create(testUser);

      let id = newUser[0].id;

      await Users.findByIdAndUpdate(id, { ...testUser, firstName: 'Updated' });

      const updated = await Users.findById(id);
      expect(updated.firstName).toBe('Updated');
    });
    it('Should delete a user', async () => {
      let preDeletion = await Users.findAll();

      let newUser = await Users.create({
        firstName: 'Bob',
        lastName: 'Doe',
        email: 'bobdoe@gmail.com',
        password: 'bobbytest123',
      });

      await Users.findByIdAndDelete(newUser[0].id);

      let postDeletion = await Users.findAll();

      // Prove that a user has been deleted
      expect(preDeletion.length - postDeletion.length).toBe(0);
    });
  });
});
