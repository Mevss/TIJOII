import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../server.js';

describe('POST /api/validate-tmdb-key - Real Integration Tests', () => {
  it.skipIf(!process.env.TMDB_API_KEY)('should return valid for correct key', async () => {
    const tmdbApiKey = process.env.TMDB_API_KEY;

    const response = await request(app)
      .post('/api/validate-tmdb-key')
      .send({ apiKey: tmdbApiKey })
      .timeout(10000);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      valid: true,
      message: 'API key is valid'
    });
  }, 10000);

  it('should return invalid for wrong key', async () => {
    const response = await request(app)
      .post('/api/validate-tmdb-key')
      .send({ apiKey: 'invalid-key-123' })
      .timeout(10000);

    expect(response.status).toBe(200);
    expect(response.body.valid).toBe(false);
    expect(response.body.error).toBe('Invalid TMDB API key.');
  }, 10000);

  it('should return 400 for missing key', async () => {
    const response = await request(app)
      .post('/api/validate-tmdb-key')
      .send({})
      .timeout(10000);

    expect(response.status).toBe(400);
    expect(response.body.valid).toBe(false);
    expect(response.body.error).toBe('API key is required');
  }, 10000);
});
