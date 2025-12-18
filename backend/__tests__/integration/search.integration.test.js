import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../server.js';

describe('Search API Integration', () => {
  it('should return books from OpenLibrary API', async () => {
    const response = await request(app)
      .get('/api/search')
      .query({ query: 'tolkien', source: 'openlibrary' });

    expect(response.status).toBe(200);
    expect(response.body.source).toBe('openlibrary');
    expect(response.body.results).toBeInstanceOf(Array);
    expect(response.body.results.length).toBeGreaterThan(0);
    expect(response.body.results[0]).toHaveProperty('title');
    expect(response.body.results[0]).toHaveProperty('author');
    expect(response.body.results[0].type).toBe('book');
  });

  it.skipIf(!process.env.TMDB_API_KEY)('should return movies from TMDB API with API key', async () => {
    const tmdbApiKey = process.env.TMDB_API_KEY;

    const response = await request(app)
      .get('/api/search')
      .query({ query: 'matrix', source: 'tmdb', apiKey: tmdbApiKey });

    expect(response.status).toBe(200);
    expect(response.body.source).toBe('tmdb');
    expect(response.body.results).toBeInstanceOf(Array);
    expect(response.body.results.length).toBeGreaterThan(0);
    expect(response.body.results[0]).toHaveProperty('title');
    expect(response.body.results[0].type).toBe('movie');
  });

  it('should return 400 without query parameter', async () => {
    const response = await request(app)
      .get('/api/search')
      .query({ source: 'openlibrary' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Query required');
  });

  it('should return 400 with invalid source', async () => {
    const response = await request(app)
      .get('/api/search')
      .query({ query: 'test', source: 'invalid' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Valid parameter required (openlibrary or tmdb)');
  });
});
