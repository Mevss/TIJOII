import React from 'react';

const StarRating = ({ rating, onRatingChange, readonly = false }) => {
  const stars = [1, 2, 3, 4, 5];

  const handleClick = (value) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className="flex items-center gap-1 text-2xl">
      {stars.map((star) => (
        <span
          key={star}
          className={`transition-colors ${
            star <= rating ? 'text-amber-400' : 'text-slate-300'
          } ${readonly ? 'cursor-default' : 'cursor-pointer hover:text-amber-400'}`}
          onClick={() => handleClick(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
