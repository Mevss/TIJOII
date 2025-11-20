import * as openLibraryService from '../services/openLibrary.service.js';
import * as tmdbService from '../services/tmdb.service.js';

export const searchMedia = async (req, res) => {
  const { query, source, apiKey: customApiKey } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query required' });
  }

  if (!source || !['openlibrary', 'tmdb'].includes(source)) {
    return res.status(400).json({ error: 'Valid parameter required (openlibrary or tmdb)' });
  }

  try {
    let results;

    if (source === 'openlibrary') {
      results = await openLibraryService.searchBooks(query);
    } else if (source === 'tmdb') {
      const apiKey = customApiKey || process.env.TMDB_API_KEY;
      results = await tmdbService.searchMovies(query, apiKey);
    }

    res.json({ results, source });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getMediaDetails = async (req, res) => {
  const { id, source } = req.params;
  const { apiKey: customApiKey } = req.query;

  if (!source || !['openlibrary', 'tmdb'].includes(source)) {
    return res.status(400).json({ error: 'Parameter is required' });
  }

  try {
    let details;

    if (source === 'openlibrary') {
      details = await openLibraryService.getBookDetails(id);
    } else if (source === 'tmdb') {
      const apiKey = customApiKey || process.env.TMDB_API_KEY;
      details = await tmdbService.getMovieDetails(id, apiKey);
    }

    res.json(details);
  } catch (error) {
    console.error('Details error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const validateTmdbKey = async (req, res) => {
  const { apiKey } = req.body;

  if (!apiKey) {
    return res.status(400).json({ error: 'API key is required', valid: false });
  }

  try {
    await tmdbService.searchMovies('test', apiKey);
    res.json({ valid: true, message: 'API key is valid' });
  } catch (error) {
    console.error('API key validation error:', error);
    res.status(200).json({ valid: false, error: 'Invalid TMDB API key.' });
  }
};
