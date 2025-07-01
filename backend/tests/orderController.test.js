import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../index.js'; // ESM ile export edilmiş Express app

describe('POST /api/order/:tenant/:table_id', () => {
  it('400 döner items payload eksikse', async () => {
    const res = await request(app)
      .post('/api/order/Restaurant%20A/1')
      .send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Invalid items payload/);
  });
});
