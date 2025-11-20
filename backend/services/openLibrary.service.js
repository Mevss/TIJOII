import axios from 'axios';

const OPEN_LIBRARY_BASE_URL = 'https://openlibrary.org';

export const searchBooks = async (query) => {
  try {
    const response = await axios.get(`${OPEN_LIBRARY_BASE_URL}/search.json`, {
      params: {
        q: query,
        limit: 10
      }
    });

    return response.data.docs.map(book => ({
      id: book.key,
      title: book.title,
      author: book.author_name?.[0] || 'Unknown',
      year: book.first_publish_year || 'N/A',
      coverUrl: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : null,
      type: 'book'
    }));
  } catch (error) {
    throw new Error(`OpenLibrary API error: ${error.message}`);
  }
};

export const getBookDetails = async (bookId) => {
  try {
    const response = await axios.get(`${OPEN_LIBRARY_BASE_URL}${bookId}.json`);
    return response.data;
  } catch (error) {
    throw new Error(`OpenLibrary API error: ${error.message}`);
  }
};
