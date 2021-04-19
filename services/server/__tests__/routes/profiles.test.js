const request = require('supertest');
const express = require('express');
const Users = require('../../api/routes/users/userModel');
const userRouter = require('../../api/routes/users/userRouter');
const mockData = require('../../generators/generate');

const server = express();
server.use(express.json());

// mock the authId

// Mock the database
jest.mock('../../api/routes/users/userModel');

// Mock authRequired middleware

jest.mock('../../api/middleware/authRequired', () => {
  return jest.fn((req, res, next) => next());
});

jest.mock('../../api/middleware/restrictTo', () => {
  return jest.fn(() => (req, res, next) => next());
});

// Test users/me route
describe('User router endpoints', () => {
  beforeAll(() => {
    server.use(['/user', '/users'], userRouter);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /', () => {
    it('Should return an array of Objects containing all users data', async () => {
      Users.findAll.mockResolvedValue([
        mockData.buildUser(),
        mockData.buildUser(),
        mockData.buildUser(),
      ]);
      try {
        const res = await request(server).get('/users');
        expect(res.statusCode).toBe(200);
      } catch (error) {
        expect(res.statusCode).toBe(500);
      }
    });
  });

  describe('GET /me', () => {
    it('Should return a user object containing information about the user', async () => {
      // mockResolvedValue should have a value of the expected returned value
      const user = {
        id: mockData?.getUserId(),
        email: mockData?.getEmail(),
        firstName: mockData?.getFirstName(),
        lastName: mockData?.getLastName(),
        role: mockData?.getRole(),
        isRequestingAssistance: mockData?.getAssistanceReq(),
        requestStatus: mockData?.getRequestStatus(),
        familySize: mockData?.getFamilySize(),
        incomeId: mockData?.getId(),
        addressId: mockData?.getId(),
        organizationId: mockData?.getId(),
      };
      const userObject = { user: user };
      try {
        console.log(addressObject);
        User.findById.mockResolvedValue(addressObject);
        const res = await request(server).get('/users/me');
        expect(res.statusCode).toBe(200);
      } catch (error) {
        console.log(error.nessage);
      }
    });
  });

  describe('GET /:id', () => {
    it('Should return the data of a user with the given id', async () => {
      const getUserId = mockData?.getUserId();

      Users.findById.mockResolvedValue({
        id: getUserId,
        email: mockData?.getEmail(),
        firstName: mockData?.getFirstName(),
        lastName: mockData?.getLastName(),
        role: mockData?.getRole(),
        isRequestingAssistance: mockData?.getAssistanceReq(),
        requestStatus: mockData?.getRequestStatus(),
        familySize: mockData.getFamilySize(),
        monthlyIncome: mockData?.getMonthlyIncome(),
        addressId: mockData?.getId(),
        organizationId: mockData?.getId(),
      });
      try {
        const res = await request(server).get(`/users/${getUserId}`);
        expect(res.statusCode).toBe(200);
      } catch (err) {
        console.log(err.message);
      }
    });
  });

  describe('GET /:id/address', () => {
    it('Should return the address for the user with the given id', async () => {
      const getUserId = mockData?.getUserId();

      const address = {
        address: mockData?.getAddress(),
        state: mockData?.getState(),
        city: mockData?.getCity(),
        zipCode: mockData?.getZipCode(),
      };
      const addressObject = { address: address };

      try {
        Users.findAddressByUserId.mockResolvedValueOnce(addressObject);
        const res = await request(server).get(`/users/${getUserId}/address`);
        expect(res.statusCode).toBe(200);
      } catch (err) {
        console.log(err.message);
      }
    });
  });
});
