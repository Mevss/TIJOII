import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import axios from 'axios';
import app from '../../server.js';
import { createMockMovieResponse } from '../factories/testData.js';

vi.mock('axios');

describe('POST /api/validate-tmdb-key - Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return valid for correct key', async () => {
    const mockResponse = createMockMovieResponse();
    vi.mocked(axios.get).mockResolvedValue(mockResponse);

    const response = await request(app)
      .post('/api/validate-tmdb-key')
      .send({ apiKey: 'valid-key' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      valid: true,
      message: 'API key is valid'
    });
  });

  it('should return invalid for wrong key', async () => {
    vi.mocked(axios.get).mockRejectedValue(new Error('Unauthorized'));

    const response = await request(app)
      .post('/api/validate-tmdb-key')
      .send({ apiKey: 'invalid-key' });

    expect(response.status).toBe(200);
    expect(response.body.valid).toBe(false);
    expect(response.body.error).toBe('Invalid TMDB API key.');
  });
});
