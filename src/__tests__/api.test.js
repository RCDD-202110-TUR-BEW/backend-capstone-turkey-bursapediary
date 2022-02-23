/* eslint-disable  no-return-await */

const request = require('supertest');
const { ObjectId } = require('mongodb');

const projectModel = require('../models/project');

const app = require('../app');

const supporter = {
  userAmount: 1000,
  userID: '6208fe43d2a4dd1c6cfd2fec',
};

const project = {
  _id: '61f7c8538de68dd098f4c033',
  id: '61f7c8538de68dd098f4c033',
  title: 'hello',
  description: 'test',
  amount: 5000,
  collectedAmount: 1000,
  isDone: false,
  isExpires: false,
  owners: ['6208fe43d2a4dd1c6cfd2fec'],
};

const user = {
  username: 'felmez',
  name: 'test',
  email: 'test@gmail.com',
  password: '12345678@Bb',
  confirmPassword: '12345678@Bb',
  role: 'normal',
  type: 'normal',
};

const comment = {
  _id: '620902f47b98c2fbc8b4c079',
  id: '620902f47b98c2fbc8b4c079',
  userID: '6208fe43d2a4dd1c6cfd2fec',
  content: 'new comment on project',
};

const newComment = {
  content: 'perfect comment on project',
};

const review = {
  _id: '62090b0727d73768ef03bbbd',
  id: '62090b0727d73768ef03bbbd',
  userID: '6208fe43d2a4dd1c6cfd2fec',
  rating: 4,
  content: 'very good review',
  username: 'felmez',
};

const newReview = {
  content: 'its very bad review now',
  rating: 1,
};
let TempProjectID = null;
beforeAll(async () => {
  const tempProject = await projectModel.create({
    title: 'temp title',
    description: 'temp description',
    amount: 0,
    categories: ['testing', 'test'],
  });
  TempProjectID = tempProject._id;
});
afterAll(async () => {
  await projectModel.findByIdAndDelete(ObjectId(TempProjectID));
});
describe('Project Routes', () => {
  describe('GET Filter', () => {
    it('Should retrun empty array if no projects matching category', async () => {
      const res = await request(app)
        .get('/projects/filter?category=undefinedtestnotrealycategorynotfund')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThanOrEqual(0);
    });
    it('Should retrun projects matching category', async () => {
      const res = await request(app)
        .get('/projects/filter?category=testing')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThanOrEqual(1);
    });
  });
  describe('GET /projects', () => {
    it('Should return all projects from db', async () => {
      const res = await request(app).get(`/projects`);

      expect(res.statusCode).toBe(200);
    });
  });
  describe('PUT /projects/:id/support', () => {
    it('Should add the user as supporter to project by id', async () => {
      const res = await request(app)
        .put(`/projects/${project.id}/support`)
        .send(supporter);

      if (res.body.length >= 1) {
        expect(res.statusCode).toBe(200);
        expect(res.body.supporters.includes(supporter.userID)).toBe(true);
      }
    });
  });
  describe('GET /projects/:id/supporters', () => {
    it('Should return supporters from project by id', async () => {
      const res = await request(app).get(`/projects/${project.id}/supporters`);

      if (res.body.length > 0) {
        expect(res.statusCode).toBe(200);
        expect(res.body.includes(supporter.userID)).toBe(true);
      } else {
        expect(res.statusCode === 422 || res.statusCode === 404).toBeTruthy();
      }
    });
  });
  describe('POST /projects/:id/comments', () => {
    it('Should create new comment on project by id', async () => {
      const res = await request(app)
        .post(`/projects/${project.id}/comments`)
        .send(comment);

      if (res.body.length > 0) {
        expect(res.statusCode).toBe(200);
        expect(res.body.comments.includes(comment.content));
      } else {
        expect(res.statusCode === 422 || res.statusCode === 404).toBeTruthy();
      }
    });
  });
  describe('PUT /projects/:id/comments/:commentId', () => {
    it('Should update comment on project by id', async () => {
      const res = await request(app)
        .put(`/projects/${project.id}/comments/${comment._id}`)
        .send(newComment);

      if (res.statusCode === 404) {
        expect(
          res.body.message === 'Project not found' ||
            res.body.message === 'Comment not found'
        ).toBeTruthy();
      } else if (res.statusCode !== 422) {
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Comment updated successfully');
        expect(res.body.comments.includes(newComment.content)).toBe(true);
      }
    });
  });
  describe('DELETE /projects/:id/comments/:commentId', () => {
    it('Should delete comment by id', async () => {
      const res = await request(app).delete(
        `/projects/${project.id}/comments/${comment._id}`
      );

      if (res.statusCode === 404) {
        expect(
          res.body.message === 'Project not found' ||
            res.body.message === 'Comment not found'
        ).toBeTruthy();
      } else if (res.statusCode !== 422) {
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Comment deleted successfully');
        expect(res.body.comments.includes(comment.content)).toBe(false);
      }
    });
  });
  describe('POST /projects/:id/reviews', () => {
    it('Should create new review on project by id', async () => {
      const res = await request(app)
        .post(`/projects/${project.id}/reviews`)
        .send(review);

      if (res.statusCode === 200) {
        expect(res.body.message).toBe('Review created successfully');
        expect(res.body.reviews.includes(review.content));
      }
      if (res.statusCode === 422) {
        expect(
          res.body.message === 'You already reviewed this project' ||
            res.body.error === 'Invalid / Expired token, try to login'
        ).toBeTruthy();
      }
      if (res.statusCode === 404) {
        expect(res.body.message).toBe('Project not found');
      }
    });
  });
  describe('PUT /projects/:id/reviews/:reviewId', () => {
    it('Should update review on project by id', async () => {
      const res = await request(app)
        .put(`/projects/${project.id}/reviews/${review._id}`)
        .send(newReview);

      if (res.statusCode === 404) {
        expect(
          res.body.message === 'Project not found' ||
            res.body.message === 'Review not found'
        ).toBeTruthy();
      } else if (res.statusCode !== 422) {
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Review updated successfully');
        expect(res.body.reviews.includes(newReview.content));
      }
    });
  });
  describe('DELETE /projects/:id/reviews/:reviewId', () => {
    it('Should delete review by id', async () => {
      const res = await request(app).delete(
        `/projects/${project.id}/reviews/${review._id}`
      );

      if (res.statusCode === 404) {
        expect(
          res.body.message === 'Project not found' ||
            res.body.message === 'Review not found'
        ).toBeTruthy();
      } else if (res.statusCode !== 422) {
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Review deleted successfully');
        expect(res.body.reviews.includes(review.content)).toBe(false);
      }
    });
  });
  describe('GET /project/:id/profile', () => {
    it('Should return project profile with info populated', async () => {
      const res = await request(app).get(`/projects/${project.id}/profile`);
      if (res.statusCode === 404) {
        expect(res.body.message).toBe('Project not found');
      } else if (res.statusCode !== 422) {
        expect(res.statusCode).toBe(200);
        expect(res.body.reviews.length).toBeGreaterThanOrEqual(1);
        expect(res.body.comments.length).toBeGreaterThanOrEqual(1);
        expect(res.body.supporters.length).toBeGreaterThanOrEqual(1);
        expect(res.body.donations.length).toBeGreaterThanOrEqual(1);
        expect(res.body.reviews.includes(review.username));
        expect(res.body.comments.includes(review.username));
        expect(res.body.supporters.includes(review.username));
        expect(res.body.donations.includes(review.username));
      }
    });
  });
});

describe('User Routes', () => {
  describe('GET /users/:username', () => {
    it('Should return user profile with info populated', async () => {
      const res = await request(app).get(`/users/${user.username}`);
      if (res.statusCode === 404) {
        expect(res.body.message).toBe('User not found');
      } else if (res.statusCode !== 422) {
        expect(res.statusCode).toBe(200);
        expect(res.body.donations.length).toBeGreaterThanOrEqual(1);
        expect(res.body.donations.includes(project.title));
      }
    });
  });
});
