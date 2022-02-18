/* eslint-disable  no-underscore-dangle */
/* eslint-disable  no-return-await */

const request = require('supertest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = require('../../app');

let userID = null;
afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
});
describe('User API End Points', () => {
  describe('Auth API', () => {
    const sendRequestToUsers = async (endpoint, user) =>
      await request(app)
        .post(`/users/${endpoint}`)
        .set('Content-Type', 'application/json')
        .send(user);
    describe('POST /register', () => {
      it('Should register a new user successfully', async () => {
        const spyOnHash = jest.spyOn(bcrypt, 'hash');
        const user = {
          username: 'yaman',
          email: 'yaman@yaman.com',
          password: '1P@assword',
          confirmPassword: '1P@assword',
        };
        const res = await sendRequestToUsers('register', user);

        expect(res.headers).toEqual(
          expect.objectContaining({
            'content-type': 'application/json; charset=utf-8',
          })
        );
        expect(res.body).toEqual(
          expect.objectContaining({
            username: user.username,
            email: user.email,
          })
        );
        expect(res.statusCode).toEqual(201);
        expect(spyOnHash).toHaveBeenCalledTimes(1);
        userID = res.body._id;
      });

      describe('Username validation', () => {
        it('Should throw error with message username already taken', async () => {
          const user = {
            username: 'yaman',
            email: 'yaman@yaman.com',
            password: '1P@assword',
            confirmPassword: '1P@assword',
          };
          const res = await sendRequestToUsers('register', user);
          expect(res.headers).toEqual(
            expect.objectContaining({
              'content-type': 'application/json; charset=utf-8',
            })
          );
          expect(res.statusCode).toEqual(400);
          expect(res.body.message).toContain('Username already taken');
        });
        it('Should throw error with message Username should not be empty', async () => {
          const user = {
            username: null,
            email: 'sdyaasdman@yaman.com',
            password: '1P@assword',
            confirmPassword: '1P@assword',
          };
          const res = await sendRequestToUsers('register', user);

          expect(res.headers).toEqual(
            expect.objectContaining({
              'content-type': 'application/json; charset=utf-8',
            })
          );
          expect(res.statusCode).toEqual(400);
          expect(res.text).toContain('Username should not be empty');
        });

        it('Should throw error with message Username must be at least 4 characters long', async () => {
          const user = {
            username: 'yam',
            email: 'sdyaasdman@yaman.com',
            password: '1P@assword',
            confirmPassword: '1P@assword',
          };
          const res = await sendRequestToUsers('register', user);

          expect(res.headers).toEqual(
            expect.objectContaining({
              'content-type': 'application/json; charset=utf-8',
            })
          );
          expect(res.statusCode).toEqual(400);
          expect(res.text).toContain(
            'Username must be at least 4 characters long'
          );
        });

        it('Should throw error with message Username should not include space', async () => {
          const user = {
            username: 'yam an',
            email: 'sdyaasdman@yaman.com',
            password: '1P@assword',
            confirmPassword: '1P@assword',
          };
          const res = await sendRequestToUsers('register', user);
          expect(res.headers).toEqual(
            expect.objectContaining({
              'content-type': 'application/json; charset=utf-8',
            })
          );
          expect(res.statusCode).toEqual(400);
          expect(res.text).toContain('Username should not include space');
        });
      });

      describe('Email validation', () => {
        it('Should throw error with message Invalid email', async () => {
          const user = {
            username: 'yam an',
            email: 'yaman.yaman',
            password: '1P@assword',
            confirmPassword: '1P@assword',
          };
          const res = await sendRequestToUsers('register', user);
          expect(res.headers).toEqual(
            expect.objectContaining({
              'content-type': 'application/json; charset=utf-8',
            })
          );
          expect(res.statusCode).toEqual(400);
          expect(res.text).toContain('Invalid email');
        });

        it('Should throw error with message Email should not be empty', async () => {
          const user = {
            username: 'yam an',
            email: null,
            password: '1P@assword',
            confirmPassword: '1P@assword',
          };
          const res = await sendRequestToUsers('register', user);
          expect(res.headers).toEqual(
            expect.objectContaining({
              'content-type': 'application/json; charset=utf-8',
            })
          );
          expect(res.statusCode).toEqual(400);
          expect(res.text).toContain('Email should not be empty');
        });
      });
      describe('Password validation', () => {
        it('Should throw error with message Password must be at least 5 characters long', async () => {
          const user = {
            username: 'yam an',
            email: null,
            password: 'r24S',
            confirmPassword: 'r24S',
          };
          const res = await sendRequestToUsers('register', user);
          expect(res.headers).toEqual(
            expect.objectContaining({
              'content-type': 'application/json; charset=utf-8',
            })
          );
          expect(res.statusCode).toEqual(400);
          expect(res.text).toContain(
            'Password must be at least 5 characters long'
          );
        });

        it('Should throw error with message Password must contain a number, uppercase and lowercase', async () => {
          const user = {
            username: 'yam an',
            email: null,
            password: 'randompassword',
            confirmPassword: 'randompassword',
          };
          const res = await sendRequestToUsers('register', user);
          expect(res.headers).toEqual(
            expect.objectContaining({
              'content-type': 'application/json; charset=utf-8',
            })
          );
          expect(res.statusCode).toEqual(400);
          expect(res.text).toContain(
            'Password must contain a number, uppercase and lowercase'
          );
        });

        it('Should throw error with message Passwords are not matching', async () => {
          const user = {
            username: 'yam an',
            email: null,
            password: 'randompassword24sS',
            confirmPassword: 'randompassword24s',
          };
          const res = await sendRequestToUsers('register', user);
          expect(res.headers).toEqual(
            expect.objectContaining({
              'content-type': 'application/json; charset=utf-8',
            })
          );
          expect(res.statusCode).toEqual(400);
          expect(res.text).toContain('Passwords are not matching');
        });

        it('Should throw error with message Password should not be empty', async () => {
          const user = {
            username: 'yam an',
            email: null,
            password: null,
            confirmPassword: null,
          };
          const res = await sendRequestToUsers('register', user);
          expect(res.headers).toEqual(
            expect.objectContaining({
              'content-type': 'application/json; charset=utf-8',
            })
          );
          expect(res.statusCode).toEqual(400);
          expect(res.text).toContain('Password should not be empty');
        });
      });
    });
    describe('POST /login', () => {
      it('Should login and return token', async () => {
        jwt.sign = jest
          .fn()
          .mockReturnValueOnce('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
        const spyOnSign = jest.spyOn(jwt, 'sign');

        const user = {
          username: 'yaman',
          password: '1P@assword',
        };

        const res = await sendRequestToUsers('login', user);
        expect(res.headers).toEqual(
          expect.objectContaining({
            'content-type': 'application/json; charset=utf-8',
          })
        );
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual(
          '{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"}'
        );
        expect(spyOnSign).toHaveBeenCalledTimes(1);
      });
      describe('Username validation', () => {
        it('Should throw error with message wrong username or password', async () => {
          const user = {
            username: 'yaman1',
            password: '1P@assword1',
          };
          const res = await sendRequestToUsers('login', user);
          expect(res.headers).toEqual(
            expect.objectContaining({
              'content-type': 'application/json; charset=utf-8',
            })
          );
          expect(res.statusCode).toEqual(400);
          expect(res.body.message).toContain('wrong username or password');
        });
        it('Should throw error with message Username should not be empty', async () => {
          const user = {
            username: null,
            password: '1P@assword',
          };
          const res = await sendRequestToUsers('login', user);
          expect(res.headers).toEqual(
            expect.objectContaining({
              'content-type': 'application/json; charset=utf-8',
            })
          );
          expect(res.statusCode).toEqual(400);

          expect(res.text).toContain('Username should not be empty');
        });

        it('Should throw error with message Username must be at least 4 characters long', async () => {
          const user = {
            username: 'yam',
            password: '1P@assword',
          };
          const res = await sendRequestToUsers('login', user);
          expect(res.headers).toEqual(
            expect.objectContaining({
              'content-type': 'application/json; charset=utf-8',
            })
          );
          expect(res.statusCode).toEqual(400);

          expect(res.text).toContain(
            'Username must be at least 4 characters long'
          );
        });
      });

      describe('Password validation', () => {
        it('Should throw error with message wrong username or password', async () => {
          const user = {
            username: 'yaman',
            password: '1P@assword1qw',
          };
          const res = await sendRequestToUsers('login', user);
          expect(res.headers).toEqual(
            expect.objectContaining({
              'content-type': 'application/json; charset=utf-8',
            })
          );
          expect(res.statusCode).toEqual(400);
          expect(res.body.message).toContain('wrong username or password');
        });
        it('Should throw error with message Password must be at least 5 characters long', async () => {
          const user = {
            username: 'yam an',
            password: 'r24S',
          };
          const res = await sendRequestToUsers('login', user);
          expect(res.headers).toEqual(
            expect.objectContaining({
              'content-type': 'application/json; charset=utf-8',
            })
          );
          expect(res.statusCode).toEqual(400);
          expect(res.text).toContain(
            'Password must be at least 5 characters long'
          );
        });

        it('Should throw error with message Password should not be empty', async () => {
          const user = {
            username: 'yam an',
            password: null,
          };
          const res = await sendRequestToUsers('login', user);
          expect(res.headers).toEqual(
            expect.objectContaining({
              'content-type': 'application/json; charset=utf-8',
            })
          );
          expect(res.statusCode).toEqual(400);
          expect(res.text).toContain('Password should not be empty');
        });
      });
    });
    describe('POST /logout', () => {
      it('Should logout', async () => {
        const res = await request(app).post('/users/logout').expect(200);
        expect(res.body.success).toEqual(true);
      });
    });
  });
  describe('CRUD API', () => {
    describe('PUT /users/:id', () => {
      it('Should update a matching user', async () => {
        const res = await request(app)
          .put(`/users/${userID}`)
          .send({ username: 'YAMANO' });

        expect(res.status).toBe(200);
        expect(res.body).toEqual(
          expect.objectContaining({
            username: 'YAMANO',
          })
        );
      });
    });
    describe('DELETE /users/:id', () => {
      it('Should delete a matching user', () => {
        request(app).delete(`/users/${userID}`).expect(204);
      });
    });
  });
});
