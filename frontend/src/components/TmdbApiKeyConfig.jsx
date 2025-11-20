import React, { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { MediaContext } from '../context/MediaContext';
import { validateTmdbKey } from '../services/api.service';

const TmdbApiKeyConfig = () => {
  const { tmdbApiKeyConfig, setTmdbApiKeyConfig } = useContext(MediaContext);
  const [keyType, setKeyType] = useState(tmdbApiKeyConfig.type);
  const [customKey, setCustomKey] = useState(tmdbApiKeyConfig.customKey);
  const [isValidating, setIsValidating] = useState(false);

  const handleKeyTypeChange = (type) => {
    setKeyType(type);
    if (type === 'default') {
      setTmdbApiKeyConfig({ type: 'default', customKey: '' });
    }
  };

  const handleValidateAndSave = async () => {
    if (keyType === 'default') {
      setTmdbApiKeyConfig({ type: 'default', customKey: '' });
      toast.success('Default TMDB key enabled');
      return;
    }

    if (!customKey.trim()) {
      toast.error('Enter a key first');
      return;
    }

    setIsValidating(true);
    try {
      const result = await validateTmdbKey(customKey);

      if (result.valid) {
        setTmdbApiKeyConfig({ type: 'custom', customKey });
        toast.success('TMDB key saved');
      } else {
        toast.error(result.error || 'TMDB key rejected');
      }
    } catch (error) {
      toast.error('TMDB check failed');
    } finally {
      setIsValidating(false);
    }
  };

  const inputStyles =
    'w-full rounded-lg border-2 border-slate-200 px-3 py-2 text-sm text-slate-900 transition focus:border-sky-500 focus:outline-none';

  const optionClasses =
    'flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition';

  return (
    <div className="mx-auto max-w-xl space-y-5">
      <h3 className="text-center text-2xl font-semibold text-slate-800">TMDB API Key Configuration</h3>

      <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-center">
        <label
          className={`${optionClasses} ${
            keyType === 'default'
              ? 'border-sky-500 bg-sky-50 text-sky-700'
              : 'border-transparent bg-white text-slate-600 shadow-sm'
          }`}
        >
          <input
            type="radio"
            value="default"
            checked={keyType === 'default'}
            onChange={(e) => handleKeyTypeChange(e.target.value)}
            className="h-4 w-4 accent-sky-500"
          />
          <span>Default</span>
        </label>
        <label
          className={`${optionClasses} ${
            keyType === 'custom'
              ? 'border-sky-500 bg-sky-50 text-sky-700'
              : 'border-transparent bg-white text-slate-600 shadow-sm'
          }`}
        >
          <input
            type="radio"
            value="custom"
            checked={keyType === 'custom'}
            onChange={(e) => handleKeyTypeChange(e.target.value)}
            className="h-4 w-4 accent-sky-500"
          />
          <span>Custom API Key</span>
        </label>
      </div>

      {keyType === 'custom' && (
        <div>
          <input
            type="text"
            className={inputStyles}
            placeholder="Enter your TMDB API key"
            value={customKey}
            onChange={(e) => setCustomKey(e.target.value)}
          />
        </div>
      )}

      <button
        className="w-full rounded-lg bg-sky-500 px-4 py-3 text-base font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-slate-300"
        onClick={handleValidateAndSave}
        disabled={isValidating}
      >
        {isValidating ? 'Validating...' : 'Save Configuration'}
      </button>
    </div>
  );
};

export default TmdbApiKeyConfig;
