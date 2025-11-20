import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { MediaProvider, useMedia } from './context/MediaContext';
import ApiToggle from './components/ApiToggle';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import MediaCollection from './components/MediaCollection';
import AddMediaForm from './components/AddMediaForm';
import TmdbApiKeyConfig from './components/TmdbApiKeyConfig';
import { searchMedia } from './services/api.service';

const panelClass = 'rounded-2xl bg-white p-6 shadow-card';

const AppContent = () => {
  const [selectedApi, setSelectedApi] = useState('openlibrary');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    mediaList,
    addMedia,
    deleteMedia,
    updateRating,
    editMedia,
    addComment,
    deleteComment,
    addMediaFromSearch,
    getTmdbApiKey
  } = useMedia();

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    try {
      const apiKey = selectedApi === 'tmdb' ? getTmdbApiKey() : null;
      const data = await searchMedia(query, selectedApi, apiKey);
      setSearchResults(data.results || []);
    } catch (err) {
      setError('Search failed. Try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCollection = (item) => {
    addMediaFromSearch(item);
    toast.success(`"${item.title}" added to your collection!`);
  };

  return (
    <div className="mx-auto max-w-[1400px] space-y-8 px-5 py-8">
      <Toaster position="top-right" />
      <header className="rounded-2xl bg-slate-800 px-6 py-10 text-center text-white shadow-card">
        <h1 className="text-3xl font-semibold tracking-tight">TIJO II</h1>
      </header>

      <main className="flex flex-col gap-8">
        <section className={`${panelClass} space-y-5`}>
          <ApiToggle selectedApi={selectedApi} onApiChange={setSelectedApi} />
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          {error && (
            <div className="rounded-lg bg-red-500/90 px-4 py-2 text-center text-sm font-semibold text-white">
              {error}
            </div>
          )}
          <ResultsList results={searchResults} onAddToCollection={handleAddToCollection} />
        </section>

        <section className={panelClass}>
          <MediaCollection
            mediaList={mediaList}
            onUpdateRating={updateRating}
            onDelete={deleteMedia}
            onAddComment={addComment}
            onDeleteComment={deleteComment}
            onEdit={editMedia}
          />
        </section>

        <section className={panelClass}>
          <AddMediaForm onAddMedia={addMedia} />
        </section>

        <section className={panelClass}>
          <TmdbApiKeyConfig />
        </section>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <MediaProvider>
      <AppContent />
    </MediaProvider>
  );
};

export default App;
