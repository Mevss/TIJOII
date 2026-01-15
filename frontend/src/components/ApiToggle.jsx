import React from 'react';

const optionBase =
  'flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition';

const ApiToggle = ({ selectedApi, onApiChange }) => {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50/80 p-4 sm:flex-row sm:items-center sm:justify-center">
      <label
        className={`${optionBase} ${
          selectedApi === 'openlibrary'
            ? 'border-sky-500 bg-sky-50 text-sky-700'
            : 'border-transparent bg-white text-slate-600 shadow-sm'
        }`}
      >
        <input
          type="radio"
          value="openlibrary"
          checked={selectedApi === 'openlibrary'}
          onChange={(e) => onApiChange(e.target.value)}
          className="h-4 w-4 accent-sky-500"
        />
        <span>Open Library (Books)</span>
      </label>
      <label
        className={`${optionBase} ${
          selectedApi === 'tmdb'
            ? 'border-sky-500 bg-sky-50 text-sky-700'
            : 'border-transparent bg-white text-slate-600 shadow-sm'
        }`}
      >
        <input
          type="radio"
          value="tmdb"
          checked={selectedApi === 'tmdb'}
          onChange={(e) => onApiChange(e.target.value)}
          className="h-4 w-4 accent-sky-500"
        />
        <span>TMDB (Movies)</span>
      </label>
    </div>
  );
};

export default ApiToggle;
