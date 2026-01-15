import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import * as tmdbService from '../../../services/tmdb.service.js';
import { createMockMovieResponse, createMockMovieDetailsResponse } from '../../factories/testData.js';

vi.mock('axios');

describe('TMDB Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('searchMovies', () => {
    it('should return formatted movies with API key', async () => {
      const mockResponse = createMockMovieResponse();
      vi.mocked(axios.get).mockResolvedValue(mockResponse);

      const result = await tmdbService.searchMovies('inception', 'valid-key');

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        id: 550,
        title: 'Test Movie',
        type: 'movie'
      });
      expect(axios.get).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/search/movie',
        expect.objectContaining({
          headers: {
            'Authorization': 'Bearer valid-key',
            'accept': 'application/json'
          }
        })
      );
    });

    it('should throw error when API key is missing', async () => {
      await expect(tmdbService.searchMovies('test', null)).rejects.toThrow(
        'TMDB API key is not configured'
      );
    });

    it('should limit results to 10 movies', async () => {
      const manyMovies = {
        data: {
          results: Array(20).fill({
            id: 1,
            title: 'Movie',
            release_date: '2020-01-01',
            poster_path: '/test.jpg',
            overview: 'Test',
            vote_average: 8.0
          })
        }
      };
      vi.mocked(axios.get).mockResolvedValue(manyMovies);

      const result = await tmdbService.searchMovies('test', 'valid-key');

      expect(result).toHaveLength(10);
    });

    it('should throw error on API failure', async () => {
      vi.mocked(axios.get).mockRejectedValue(new Error('Network error'));

      await expect(tmdbService.searchMovies('test', 'valid-key')).rejects.toThrow(
        'TMDB API error: Network error'
      );
    });
  });

  describe('getMovieDetails', () => {
    it('should return movie details with valid ID', async () => {
      const mockResponse = createMockMovieDetailsResponse();
      vi.mocked(axios.get).mockResolvedValue(mockResponse);

      const result = await tmdbService.getMovieDetails(550, 'valid-key');

      expect(result).toEqual(mockResponse.data);
      expect(axios.get).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/movie/550',
        expect.objectContaining({
          headers: {
            'Authorization': 'Bearer valid-key',
            'accept': 'application/json'
          }
        })
      );
    });

    it('should throw error on invalid movie ID', async () => {
      vi.mocked(axios.get).mockRejectedValue(new Error('Not Found'));

      await expect(tmdbService.getMovieDetails(999999999, 'valid-key')).rejects.toThrow(
        'TMDB API error: Not Found'
      );
    });
  });
});
