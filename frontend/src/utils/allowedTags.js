export const ALLOWED_TAGS = [
  'action',
  'adventure',
  'comedy',
  'drama',
  'fantasy',
  'horror',
  'mystery',
  'romance',
  'sci-fi',
  'thriller',
  'documentary',
  'biography',
  'history',
  'crime',
  'animation'
];

export const validateTags = (tags) => {
  if (!Array.isArray(tags)) {
    return { valid: false, invalidTag: 'Bad tags input' };
  }

  for (const tag of tags) {
    const normalizedTag = tag.toLowerCase().trim();
    if (normalizedTag && !ALLOWED_TAGS.includes(normalizedTag)) {
      return { valid: false, invalidTag: tag };
    }
  }

  return { valid: true };
};

export const MAX_DESCRIPTION_LENGTH = 100;

export const validateDescription = (description) => {
  if (!description) return { valid: true };

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return {
      valid: false,
      message: `Description over ${MAX_DESCRIPTION_LENGTH} chars`
    };
  }

  return { valid: true };
};
