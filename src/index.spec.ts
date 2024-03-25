import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from './index';

describe('GET /user', function () {
  it('responds with json', async () => {
    const response = await request(app).get('/');

    expect(response.statusCode).toBe(200);
  });
});
