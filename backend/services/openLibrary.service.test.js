import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import * as openLibraryService from './openLibrary.service.js';
import { createMockBookResponse, createMockBookDetailsResponse } from '../__tests__/factories/testData.js';

vi.mock('axios');

describe('OpenLibrary Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('searchBooks', () => {
    it('should return formatted books with all fields', async () => {
      const mockResponse = createMockBookResponse();
      vi.mocked(axios.get).mockResolvedValue(mockResponse);

      const result = await openLibraryService.searchBooks('harry potter');

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: '/works/OL123W',
        title: 'Test Book',
        author: 'Test Author',
        year: 2020,
        coverUrl: 'https://covers.openlibrary.org/b/id/12345-M.jpg',
        type: 'book'
      });
      expect(axios.get).toHaveBeenCalledWith('https://openlibrary.org/search.json', {
        params: { q: 'harry potter', limit: 10 }
      });
    });

    it('should handle books with missing author', async () => {
      const mockResponse = createMockBookResponse({ author_name: undefined });
      vi.mocked(axios.get).mockResolvedValue(mockResponse);

      const result = await openLibraryService.searchBooks('test');

      expect(result[0].author).toBe('Unknown');
    });

    it('should throw error on API failure', async () => {
      vi.mocked(axios.get).mockRejectedValue(new Error('Network error'));

      await expect(openLibraryService.searchBooks('test')).rejects.toThrow(
        'OpenLibrary API error: Network error'
      );
    });
  });

  describe('getBookDetails', () => {
    it('should return book details', async () => {
      const mockResponse = createMockBookDetailsResponse();
      vi.mocked(axios.get).mockResolvedValue(mockResponse);

      const result = await openLibraryService.getBookDetails('/works/OL123W');

      expect(result).toEqual(mockResponse.data);
      expect(axios.get).toHaveBeenCalledWith('https://openlibrary.org/works/OL123W.json');
    });
  });
});
