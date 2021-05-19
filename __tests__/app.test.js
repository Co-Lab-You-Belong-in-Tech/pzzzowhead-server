const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('sleepyhead-server routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  //CRUD ROUTES for User and basic information
});
