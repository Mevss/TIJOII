import { beforeAll, beforeEach, vi } from 'vitest';
import dotenv from 'dotenv';

dotenv.config();

const originalApiKey = process.env.TMDB_API_KEY;

beforeAll(() => {
  if (!originalApiKey) {
    process.env.TMDB_API_KEY = 'test-api-key';
  }
});

beforeEach(() => {
  vi.clearAllMocks();
});
