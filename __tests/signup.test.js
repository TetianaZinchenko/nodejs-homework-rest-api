require('dotenv').config();

const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../app');
const { User } = require('../models/user');

mongoose.set('strictQuery', false);

const { HOST_TEST_URI_SIGNUP } = process.env;

describe('register', () => {
  beforeAll(async () => {
    await mongoose.connect(HOST_TEST_URI_SIGNUP);

    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect(HOST_TEST_URI_SIGNUP);
  });

  it('should register new user', async () => {
    const response = await supertest(app).post('/api/users/register').send({
      email: 'testUser1@gmail.com',
      password: '123456',
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.email).toBe('testUser1@gmail.com');
  });

  it('should not register the same user 2 times', async () => {
    await supertest(app).post('/api/users/register').send({
      email: 'testUser2@gmail.com',
      password: '123456',
    });

    const response = await supertest(app).post('/api/users/register').send({
      email: 'testUser2@gmail.com',
      password: '123456',
    });
    //
    expect(response.statusCode).toBe(409);
  });
});
