import React, { createContext, useContext, useState } from 'react';
import { MAX_DESCRIPTION_LENGTH } from '../utils/allowedTags';

export const MediaContext = createContext();

const defaultMedia = [
  {
    id: '1',
    title: '1984',
    type: 'book',
    image: '/image1.jpg',
    rating: 5,
    tags: ['sci-fi', 'drama'],
    description: 'Desc1',
    comments: ['gsdsd', 'kfjdsl']
  },
  {
    id: '2',
    title: 'The Matrix',
    type: 'movie',
    image: '/image2.jpg',
    rating: 4,
    tags: ['sci-fi', 'action'],
    description: 'Desc2',
    comments: ['mxncvb', 'qwerzx']
  }
];

export const MediaProvider = ({ children }) => {
  const [mediaList, setMediaList] = useState(defaultMedia);

  const getStoredApiKeyConfig = () => {
    try {
      const stored = localStorage.getItem('tmdbApiKeyConfig');
      return stored ? JSON.parse(stored) : { type: 'default', customKey: '' };
    } catch {
      return { type: 'default', customKey: '' };
    }
  };

  const [tmdbApiKeyConfig, setTmdbApiKeyConfigState] = useState(getStoredApiKeyConfig);

  const setTmdbApiKeyConfig = (config) => {
    setTmdbApiKeyConfigState(config);
    localStorage.setItem('tmdbApiKeyConfig', JSON.stringify(config));
  };

  const getTmdbApiKey = () => {
    return tmdbApiKeyConfig.type === 'custom' ? tmdbApiKeyConfig.customKey : null;
  };

  const addMedia = (media) => {
    setMediaList(prev => [...prev, media]);
  };

  const deleteMedia = (id) => {
    setMediaList(prev => prev.filter(media => media.id !== id));
  };

  const updateRating = (id, rating) => {
    setMediaList(prev =>
      prev.map(media =>
        media.id === id ? { ...media, rating } : media
      )
    );
  };

  const editMedia = (id, updates) => {
    setMediaList(prev =>
      prev.map(media =>
        media.id === id ? { ...media, ...updates } : media
      )
    );
  };

  const addComment = (id, comment) => {
    setMediaList(prev =>
      prev.map(media =>
        media.id === id
          ? { ...media, comments: [...(media.comments || []), comment] }
          : media
      )
    );
  };

  const deleteComment = (id, commentIndex) => {
    setMediaList(prev =>
      prev.map(media =>
        media.id === id
          ? {
              ...media,
              comments: media.comments.filter((_, index) => index !== commentIndex)
            }
          : media
      )
    );
  };

  const addMediaFromSearch = (searchResult) => {
    const newMedia = {
      id: Date.now().toString(),
      title: searchResult.title,
      type: searchResult.type || 'unknown',
      image: searchResult.coverUrl || '/image1.jpg',
      rating: 1,
      tags: [],
      description: (searchResult.overview || '').slice(0, MAX_DESCRIPTION_LENGTH),
      comments: []
    };
    addMedia(newMedia);
  };

  return (
    <MediaContext.Provider
      value={{
        mediaList,
        addMedia,
        deleteMedia,
        updateRating,
        editMedia,
        addComment,
        deleteComment,
        addMediaFromSearch,
        tmdbApiKeyConfig,
        setTmdbApiKeyConfig,
        getTmdbApiKey
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia error');
  }
  return context;
};
