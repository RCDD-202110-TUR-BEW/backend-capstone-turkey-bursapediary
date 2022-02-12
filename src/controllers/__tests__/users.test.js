const request = require('supertest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = require('../../app');

let fakeUser = {
  username: 'yaman',
  email: 'yaman@yaman.com',
  password: '1P@assword',
  confirmPassword: '1P@assword',
};

describe('User API End Points', () => {
  describe('Auth API', () => {
    describe('POST /register', () => {
      it('Should register a new user successfully', async () => {
        const spyOnHash = jest.spyOn(bcrypt, 'hash');
        const res = await request(app)
          .post('/users/register')
          .set('Content-Type', 'application/json')
          .send(fakeUser)
          .expect('Content-Type', /json/)
          .expect(201);

        expect(res.body.username).toEqual(fakeUser.username);
        expect(res.body.email).toEqual(fakeUser.email);
        expect(spyOnHash).toHaveBeenCalledTimes(1);
      });

      describe('Username validation', () => {
        it('Should throw error with message username already taken', async () => {
          const res = await request(app)
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send(fakeUser)
            .expect('Content-Type', /json/)
            .expect(400);
          expect(res.body.message).toContain('Username already taken');
        });
        it('Should throw error with message Username should not be empty', async () => {
          fakeUser = {
            username: null,
            email: 'sdyaasdman@yaman.com',
            password: '1P@assword',
            confirmPassword: '1P@assword',
          };
          const res = await request(app)
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send(fakeUser)
            .expect('Content-Type', /json/)
            .expect(400);

          expect(res.text).toContain('Username should not be empty');
        });

        it('Should throw error with message Username must be at least 4 characters long', async () => {
          fakeUser = {
            username: 'yam',
            email: 'sdyaasdman@yaman.com',
            password: '1P@assword',
            confirmPassword: '1P@assword',
          };
          const res = await request(app)
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send(fakeUser)
            .expect('Content-Type', /json/)
            .expect(400);

          expect(res.text).toContain(
            'Username must be at least 4 characters long'
          );
        });

        it('Should throw error with message Username should not include space', async () => {
          fakeUser = {
            username: 'yam an',
            email: 'sdyaasdman@yaman.com',
            password: '1P@assword',
            confirmPassword: '1P@assword',
          };
          const res = await request(app)
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send(fakeUser)
            .expect('Content-Type', /json/)
            .expect(400);
          expect(res.text).toContain('Username should not include space');
        });
      });

      describe('Email validation', () => {
        it('Should throw error with message Invalid email', async () => {
          fakeUser = {
            username: 'yam an',
            email: 'yaman.yaman',
            password: '1P@assword',
            confirmPassword: '1P@assword',
          };
          const res = await request(app)
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send(fakeUser)
            .expect('Content-Type', /json/)
            .expect(400);
          expect(res.text).toContain('Invalid email');
        });

        it('Should throw error with message Email should not be empty', async () => {
          fakeUser = {
            username: 'yam an',
            email: null,
            password: '1P@assword',
            confirmPassword: '1P@assword',
          };
          const res = await request(app)
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send(fakeUser)
            .expect('Content-Type', /json/)
            .expect(400);
          expect(res.text).toContain('Email should not be empty');
        });
      });
      describe('Password validation', () => {
        it('Should throw error with message Password must be at least 5 characters long', async () => {
          fakeUser = {
            username: 'yam an',
            email: null,
            password: 'r24S',
            confirmPassword: 'r24S',
          };
          const res = await request(app)
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send(fakeUser)
            .expect('Content-Type', /json/)
            .expect(400);
          expect(res.text).toContain(
            'Password must be at least 5 characters long'
          );
        });

        it('Should throw error with message Password must contain a number, uppercase and lowercase', async () => {
          fakeUser = {
            username: 'yam an',
            email: null,
            password: 'randompassword',
            confirmPassword: 'randompassword',
          };
          const res = await request(app)
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send(fakeUser)
            .expect('Content-Type', /json/)
            .expect(400);
          expect(res.text).toContain(
            'Password must contain a number, uppercase and lowercase'
          );
        });

        it('Should throw error with message Passwords are not matching', async () => {
          fakeUser = {
            username: 'yam an',
            email: null,
            password: 'randompassword24sS',
            confirmPassword: 'randompassword24s',
          };
          const res = await request(app)
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send(fakeUser)
            .expect('Content-Type', /json/)
            .expect(400);
          expect(res.text).toContain('Passwords are not matching');
        });

        it('Should throw error with message Password should not be empty', async () => {
          fakeUser = {
            username: 'yam an',
            email: null,
            password: null,
            confirmPassword: null,
          };
          const res = await request(app)
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send(fakeUser)
            .expect('Content-Type', /json/)
            .expect(400);
          expect(res.text).toContain('Password should not be empty');
        });
      });
    });
    describe('POST /login', () => {
      it('should login and return token', async () => {
        jwt.sign = jest
          .fn()
          .mockReturnValueOnce('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
        const spyOnSign = jest.spyOn(jwt, 'sign');
        fakeUser = {
          username: 'yaman',
          email: 'yaman@yaman.com',
          password: '1P@assword',
          confirmPassword: '1P@assword',
        };
        await request(app)
          .post('/users/login')
          .send(fakeUser)
          .expect(200)
          .expect((res) => {
            expect(res.text).toEqual(
              '{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"}'
            );
          });
        expect(spyOnSign).toHaveBeenCalledTimes(1);
      });
    });
    describe('POST /logout', () => {
      it('Should logout', async () => {
        const res = await request(app).post('/users/logout').expect(200);
        expect(res.body.success).toEqual(true);
      });
    });
  });
  describe('CRUD API', () => {});
});
