require('dotenv').config();

const supertest = require('supertest');
const mongoose = require('mongoose');

// const jwt = require('jsonwebtoken');

const app = require('../app');
// const { User } = require('../models/user');

mongoose.set('strictQuery', false);

const { HOST_TEST_URI_SIGNIN } = process.env;
// const { SECRET_KEY } = process.env;

describe('login', () => {
  beforeAll(async () => {
    await mongoose.connect(HOST_TEST_URI_SIGNIN);
  });

  afterAll(async () => {
    await mongoose.disconnect(HOST_TEST_URI_SIGNIN);
  });

  it('response must have status code 200', async () => {
    await supertest(app).post('/api/users/register').send({
      email: 'testUser@gmail.com',
      password: '123456',
    });

    const response = await supertest(app).post('/api/users/login').send({
      email: 'testUser@gmail.com',
      password: '123456',
    });

    expect(response.statusCode).toBe(200);
  });

  it('the token must be returned in the response', async () => {
    const response = await supertest(app).post('/api/users/login').send({
      email: 'testUser@gmail.com',
      password: '123456',
    });

    // -----------------------------

    expect(response.body.token).toBeTruthy();

    // -----------------------------
    //   const { email } = response.body.user;
    //   const user = await User.findOne({ email });

    //   const payload = {
    //     id: user._id,
    //   };

    //   const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

    //   expect(response.body.token).toBe(token);
    // -----------------------------
  });

  it('the response should return a user object with 2 fields email and subscription, having the data type String', async () => {
    const user = {
      email: 'testUser@gmail.com',
      password: '123456',
    };

    const response = await supertest(app).post('/api/users/login').send(user);

    expect(typeof response.body.user.email).toBe('string');
    expect(typeof response.body.user.subscription).toBe('string');
  });
});
