import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../server.js';

describe('GET /api/details/:source/:id - Real Integration Tests', () => {
  it('should return book details from OpenLibrary', async () => {
    const response = await request(app)
      .get('/api/details/openlibrary/%2Fworks%2FOL45804W')
      .timeout(10000);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title');
  }, 10000);

  it.skipIf(!process.env.TMDB_API_KEY)('should return movie details from TMDB', async () => {
    const tmdbApiKey = process.env.TMDB_API_KEY;

    const response = await request(app)
      .get('/api/details/tmdb/603')
      .query({ apiKey: tmdbApiKey })
      .timeout(10000);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('id');
  }, 10000);

  it('should return 400 with invalid source', async () => {
    const response = await request(app)
      .get('/api/details/invalid/123');

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Parameter is required');
  });
});
