import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../server.js';

describe('Real API E2E Tests', () => {
  it('should fetch real books from OpenLibrary API', async () => {
    const response = await request(app)
      .get('/api/search')
      .query({ query: 'tolkien', source: 'openlibrary' })
      .timeout(15000);

    expect(response.status).toBe(200);
    expect(response.body.source).toBe('openlibrary');
    expect(response.body.results).toBeInstanceOf(Array);
    expect(response.body.results.length).toBeGreaterThan(0);
    expect(response.body.results[0]).toHaveProperty('title');
    expect(response.body.results[0]).toHaveProperty('author');
    expect(response.body.results[0].type).toBe('book');
  }, 15000);

  it.skipIf(!process.env.TMDB_API_KEY)('should fetch real movies from TMDB API', async () => {
    const tmdbApiKey = process.env.TMDB_API_KEY;

    const response = await request(app)
      .get('/api/search')
      .query({ query: 'matrix', source: 'tmdb', apiKey: tmdbApiKey })
      .timeout(15000);

    expect(response.status).toBe(200);
    expect(response.body.source).toBe('tmdb');
    expect(response.body.results).toBeInstanceOf(Array);
    expect(response.body.results.length).toBeGreaterThan(0);
    expect(response.body.results[0]).toHaveProperty('title');
    expect(response.body.results[0]).toHaveProperty('overview');
    expect(response.body.results[0].type).toBe('movie');
  }, 15000);
});
