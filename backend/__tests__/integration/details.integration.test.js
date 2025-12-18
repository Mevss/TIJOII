import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import axios from 'axios';
import app from '../../server.js';
import { createMockBookDetailsResponse, createMockMovieDetailsResponse } from '../factories/testData.js';

vi.mock('axios');

describe('GET /api/details/:source/:id - Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return book details from OpenLibrary', async () => {
    const mockResponse = createMockBookDetailsResponse();
    vi.mocked(axios.get).mockResolvedValue(mockResponse);

    const response = await request(app)
      .get('/api/details/openlibrary/OL123W');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse.data);
  });

  it('should return movie details from TMDB', async () => {
    const mockResponse = createMockMovieDetailsResponse();
    vi.mocked(axios.get).mockResolvedValue(mockResponse);

    const response = await request(app)
      .get('/api/details/tmdb/550')
      .query({ apiKey: 'test-key' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse.data);
  });

  it('should return 400 with invalid source', async () => {
    const response = await request(app)
      .get('/api/details/invalid/123');

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Parameter is required');
  });
});
