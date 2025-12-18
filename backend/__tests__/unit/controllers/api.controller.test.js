import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as apiController from '../../../controllers/api.controller.js';
import * as openLibraryService from '../../../services/openLibrary.service.js';
import * as tmdbService from '../../../services/tmdb.service.js';
import { createMockRequest, createMockResponse } from '../../factories/testData.js';

vi.mock('../../../services/openLibrary.service.js');
vi.mock('../../../services/tmdb.service.js');

describe('API Controller', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('searchMedia', () => {
    it('should return 400 when query is missing', async () => {
      const req = createMockRequest({ query: { source: 'openlibrary' } });
      const res = createMockResponse();

      await apiController.searchMedia(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Query required' });
    });

    it('should return 400 when source is invalid', async () => {
      const req = createMockRequest({ query: { query: 'test', source: 'invalid' } });
      const res = createMockResponse();

      await apiController.searchMedia(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Valid parameter required (openlibrary or tmdb)'
      });
    });

    it('should call openLibraryService when source is openlibrary', async () => {
      const mockBooks = [{ id: '1', title: 'Book', type: 'book' }];
      vi.mocked(openLibraryService.searchBooks).mockResolvedValue(mockBooks);

      const req = createMockRequest({
        query: { query: 'tolkien', source: 'openlibrary' }
      });
      const res = createMockResponse();

      await apiController.searchMedia(req, res);

      expect(openLibraryService.searchBooks).toHaveBeenCalledWith('tolkien');
      expect(res.json).toHaveBeenCalledWith({
        results: mockBooks,
        source: 'openlibrary'
      });
    });
  });

  describe('getMediaDetails', () => {
    it('should call openLibraryService when source is openlibrary', async () => {
      const mockDetails = { title: 'Book Details' };
      vi.mocked(openLibraryService.getBookDetails).mockResolvedValue(mockDetails);

      const req = createMockRequest({
        params: { source: 'openlibrary', id: 'OL123W' },
        query: {}
      });
      const res = createMockResponse();

      await apiController.getMediaDetails(req, res);

      expect(openLibraryService.getBookDetails).toHaveBeenCalledWith('OL123W');
      expect(res.json).toHaveBeenCalledWith(mockDetails);
    });
  });
});
