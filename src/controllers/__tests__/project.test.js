const request = require('supertest');
const app = require('../../app');

describe('Projects Filter', () => {
  it('GET: /projects/filter Should retrun empty array if no projects matching category', async () => {
    const res = await request(app)
      .get('/projects/filter?category=undefinedtestnotrealycategorynotfund')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(0);
  });
  it('GET: /projects/filter Should retrun projects matching category', async () => {
    const res = await request(app)
      .get('/projects/filter?category=testing')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(1);
  });
});
