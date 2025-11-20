import React, { useState } from 'react';

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form className="flex flex-col gap-3 md:flex-row" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for media..."
        className="flex-1 rounded-lg border-2 border-slate-200 px-4 py-3 text-base text-slate-900 transition focus:border-sky-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="rounded-lg bg-sky-500 px-5 py-3 text-base font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-slate-300"
        disabled={isLoading || !query.trim()}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default SearchBar;
