const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('sleepyhead-server routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    return pool.end();
  });

  //POST
  it('should post a new user in the database', async() => {
    const res = await request(app)
      .post('/api/v1/user/newuser')
      .send({
        userName: 'Andrew',
        phoneNumber: '15038399787',
        wakeUpTime: '8:30Am',
        sleepLength: '7',
        windDownTime: 90,
        personality: 'sassy'
      });

      expect(res.body).toEqual({
        id: expect.anything(),
        userName: 'Andrew',
        phoneNumber: '15038399787',
        wakeUpTime: '8:30Am',
        sleepLength: '7',
        windDownTime: 90,
        personality: 'sassy'
      });
  });
});
