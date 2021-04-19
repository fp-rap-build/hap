const supertest = require('supertest');
const app = require('../../api/app'); // the express server
const db = require('../../data/db-config');

beforeAll(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe('Auth router endpoints', () => {
  describe('POST /auth/register', () => {
    const testUser = {
      firstName: 'test',
      lastName: 'test',
      email: 'testemail@gmail.com',
      password: 'testpassword',
      role: 'tenant',
      familySize: 2,
      monthlyIncome: 500,
      isRequestingAssistance: true,
    };

    it('Creates a new user and sends back token', async () => {
      let res = await supertest(app).post('/auth/register').send(testUser);

      expect(res.type).toBe('application/json');
      expect(res.status).toBe(201);

      // Verify response body
      const {
        firstName,
        lastName,
        email,
        role,
        monthlyIncome,
        addressId,
        requestStatus,
        isRequestingAssistance,
      } = res.body.user;

      const { token, status } = res.body;

      expect(token).toBeTruthy();

      expect(firstName).toBe('test');
      expect(lastName).toBe('test');
      expect(email).toBe('testemail@gmail.com');
      expect(role).toBe('tenant');
      expect(addressId).toBeTruthy();
      expect(requestStatus).toBe('received');
      expect(isRequestingAssistance).toBe(true);
      expect(monthlyIncome).toBe(500);
    });

    const existingUser = {
      firstName: 'John',
      lastName: 'shelby',
      email: 'tenant@gmail.com',
      password: 'testpassword',
      role: 'tenant',
      monthlyIncome: 100,
      familySize: 3,
    };

    it('Responds with 400 when user already exists', async () => {
      let res = await supertest(app).post('/auth/register').send(existingUser);

      expect(res.type).toBe('application/json');
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('User with that email already exists');
    });

    it('Responds with 422 when required are missing', async () => {
      let res = await supertest(app).post('/auth/register').send({});

      expect(res.type).toBe('application/json');
      expect(res.status).toBe(422);
      expect(res.body.errors).toBeTruthy();
    });

    it('Reponds with 422 when role is anything but landlord or tenant', async () => {
      testUser['role'] = 'admin';

      let res = await supertest(app).post('/auth/register').send(testUser);

      // Switch role back to tenant for any future tests
      testUser['role'] = 'tenant';

      expect(res.type).toBe('application/json');
      expect(res.status).toBe(422);
      expect(res.body.errors).toBeTruthy();
    });
  });

  describe('POST /auth/login', () => {
    const userCredentials = {
      email: 'admin@gmail.com',
      password: 'testpassword',
    };

    it('Responds with 201 when a user logs in', async () => {
      let res = await supertest(app).post('/auth/login').send(userCredentials);

      const { token } = res.body;
      const { email, password } = res.body.user;

      expect(res.type).toBe('application/json');
      expect(res.status).toBe(200);

      expect(token).toBeTruthy();
      expect(email).toBe('admin@gmail.com');

      // Make sure the password isn't being sent back
      expect(password).toBeFalsy();
    });

    it('Responds with 422 when required fields are missing', async () => {
      let res = await supertest(app).post('/auth/login').send({});

      expect(res.type).toBe('application/json');
      expect(res.status).toBe(422);
      expect(res.body.errors).toBeTruthy();
    });

    it('Responds with 401 when user does not exist', async () => {
      const nonExistentUser = {
        email: 'iDontExist@gmail.com',
        password: 'testpassword',
      };

      let res = await supertest(app).post('/auth/login').send(nonExistentUser);

      expect(res.type).toBe('application/json');
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Incorrect email or password');
    });

    it('Responds with 401 when passwords do not match', async () => {
      const userWithInvalidPassword = {
        email: 'tenant@gmail.com',
        password: 'Wrongpassword123',
      };

      // Login

      let res = await supertest(app)
        .post('/auth/login')
        .send(userWithInvalidPassword);

      // Assertions

      expect(res.type).toBe('application/json');
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Incorrect email or password');
    });
  });

  describe('Protected routes', () => {
    const userCredentials = {
      email: 'admin@gmail.com',
      password: 'testpassword',
    };

    it('Responds with 200 when accessing a protected route with valid token', async () => {
      // Login

      let loginResponse = await supertest(app)
        .post('/auth/login')
        .send(userCredentials);

      const { token } = loginResponse.body;

      // Hit the protected endpoint

      let res = await supertest(app)
        .get('/users/me')
        .set('authorization', `Bearer ${token}`);

      // Assertions

      expect(res.status).toBe(200);
    });

    it('Responds with 401 when accessing a protected route without a valid token', async () => {
      let res = await supertest(app).get('/users/me');

      expect(res.type).toBe('application/json');
      expect(res.status).toBe(401);
      expect(res.body.message).toBe(
        'You are not logged in! Please log in to get access'
      );
    });

    it('Responds with 401 when user is deleted after retrieving token', async () => {
      // ** We don't want a token to be valid if that user has been deleted **

      // Login

      let loginResponse = await supertest(app)
        .post('/auth/login')
        .send(userCredentials);

      const { token } = loginResponse.body;

      // Delete user that recently logged in

      let deletedResponse = await supertest(app)
        .del('/user/me')
        .set('authorization', `Bearer ${token}`);

      // Verify user was deleted

      expect(deletedResponse.status).toBe(204);

      // Hit a protected route

      let res = await supertest(app)
        .get('/users/me')
        .set('authorization', `Bearer ${token}`);

      // Assertions

      expect(res.type).toBe('application/json');
      expect(res.status).toBe(401);
      expect(res.body.message).toBe(
        'The user belonging to this token no longer exists'
      );
    });
  });
});
