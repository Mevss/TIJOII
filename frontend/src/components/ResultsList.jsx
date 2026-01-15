import React from 'react';

const ResultsList = ({ results, onAddToCollection }) => {
  if (!results || results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold text-slate-800">Search Results</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            {item.coverUrl && (
              <img
                src={item.coverUrl}
                alt={item.title}
                className="mb-4 h-72 w-full rounded-lg object-cover"
              />
            )}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              {item.author && <p className="text-sm text-slate-500">by {item.author}</p>}
              {item.year && <p className="text-sm text-slate-500">{item.year}</p>}
              {item.type && (
                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-600">
                  {item.type}
                </span>
              )}
              <button
                className="mt-4 w-full rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
                onClick={() => onAddToCollection(item)}
              >
                Add to Collection
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsList;
