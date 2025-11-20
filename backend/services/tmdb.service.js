import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export const searchMovies = async (query, apiKey) => {
  if (!apiKey) {
    throw new Error('TMDB API key is not configured');
  }

  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        query: query,
        language: 'en-US',
        page: 1
      },
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'accept': 'application/json'
      }
    });

    return response.data.results.slice(0, 10).map(movie => ({
      id: movie.id,
      title: movie.title,
      year: movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A',
      coverUrl: movie.poster_path
        ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
        : null,
      overview: movie.overview,
      rating: movie.vote_average,
      type: 'movie'
    }));
  } catch (error) {
    throw new Error(`TMDB API error: ${error.message}`);
  }
};

export const getMovieDetails = async (movieId, apiKey) => {
  if (!apiKey) {
    throw new Error('TMDB API key is not configured');
  }

  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
      params: {
        language: 'en-US'
      },
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'accept': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`TMDB API error: ${error.message}`);
  }
};
