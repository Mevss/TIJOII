import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import axios from 'axios';
import app from '../../server.js';
import { createMockBookResponse, createMockMovieResponse } from '../factories/testData.js';

vi.mock('axios');

describe('GET /api/search - Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return books from OpenLibrary', async () => {
    const mockResponse = createMockBookResponse();
    vi.mocked(axios.get).mockResolvedValue(mockResponse);

    const response = await request(app)
      .get('/api/search')
      .query({ query: 'harry', source: 'openlibrary' });

    expect(response.status).toBe(200);
    expect(response.body.source).toBe('openlibrary');
    expect(response.body.results).toHaveLength(1);
    expect(response.body.results[0].type).toBe('book');
  });

  it('should return movies from TMDB with API key', async () => {
    const mockResponse = createMockMovieResponse();
    vi.mocked(axios.get).mockResolvedValue(mockResponse);

    const response = await request(app)
      .get('/api/search')
      .query({ query: 'avatar', source: 'tmdb', apiKey: 'test-key' });

    expect(response.status).toBe(200);
    expect(response.body.source).toBe('tmdb');
    expect(response.body.results).toHaveLength(1);
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
