import { vi } from 'vitest';

export const createMockBookResponse = (overrides = {}) => ({
  data: {
    docs: [
      {
        key: '/works/OL123W',
        title: 'Test Book',
        author_name: ['Test Author'],
        first_publish_year: 2020,
        cover_i: 12345,
        ...overrides
      }
    ]
  }
});

export const createMockMovieResponse = (overrides = {}) => ({
  data: {
    results: [
      {
        id: 550,
        title: 'Test Movie',
        release_date: '2020-01-01',
        poster_path: '/test.jpg',
        overview: 'Test overview',
        vote_average: 8.5,
        ...overrides
      }
    ]
  }
});

export const createMockRequest = (overrides = {}) => ({
  query: {},
  params: {},
  body: {},
  ...overrides
});

export const createMockResponse = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

export const createMockBookDetailsResponse = (overrides = {}) => ({
  data: {
    title: 'Detailed Book',
    description: 'A detailed book description',
    authors: [{ name: 'Author Name' }],
    ...overrides
  }
});

export const createMockMovieDetailsResponse = (overrides = {}) => ({
  data: {
    id: 550,
    title: 'Fight Club',
    budget: 63000000,
    runtime: 139,
    genres: [{ id: 18, name: 'Drama' }],
    ...overrides
  }
});
