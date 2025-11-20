import { useState } from 'react';
import toast from 'react-hot-toast';
import { validateTags, validateDescription, ALLOWED_TAGS } from '../utils/allowedTags';

const EditMediaModal = ({ media, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: media.title,
    tags: media.tags.join(', '),
    rating: media.rating,
    description: media.description || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error('Add a title first');
      return;
    }

    const descValidation = validateDescription(formData.description);
    if (!descValidation.valid) {
      toast.error(descValidation.message);
      return;
    }

    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag);

    const tagsValidation = validateTags(tagsArray);
    if (!tagsValidation.valid) {
      toast.error(`Tag "${tagsValidation.invalidTag}" not allowed (${ALLOWED_TAGS.join(', ')})`);
      return;
    }

    const rating = parseInt(formData.rating);
    if (!rating || rating < 1 || rating > 5) {
      toast.error('Rating needs 1-5');
      return;
    }

    onSave({
      title: formData.title,
      tags: tagsArray,
      rating: rating,
      description: formData.description
    });

    toast.success('Media updated');
    onClose();
  };

  const inputStyles =
    'w-full rounded-lg border-2 border-slate-200 px-3 py-2 text-sm text-slate-900 transition focus:border-sky-500 focus:outline-none';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center text-2xl font-semibold text-slate-800">Edit Media</h2>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="edit-title" className="text-sm font-semibold text-slate-700">
              Title
            </label>
            <input
              type="text"
              id="edit-title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={inputStyles}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="edit-description" className="text-sm font-semibold text-slate-700">
              Description (max 100 chars)
            </label>
            <textarea
              id="edit-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`${inputStyles} min-h-[120px]`}
              rows="3"
            />
            <small className="text-right text-xs font-medium text-slate-500">
              {formData.description.length}/100
            </small>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="edit-tags" className="text-sm font-semibold text-slate-700">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="edit-tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className={inputStyles}
              placeholder="e.g., fantasy, sci-fi, action"
            />
            <small className="text-sm text-slate-500">
              Allowed: {ALLOWED_TAGS.join(', ')}
            </small>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="edit-rating" className="text-sm font-semibold text-slate-700">
              Rating (1-5)
            </label>
            <input
              type="number"
              id="edit-rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className={inputStyles}
            />
          </div>

          <div className="mt-4 flex justify-center gap-6">
            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500 text-2xl font-bold text-white transition hover:scale-105 hover:bg-rose-600"
              onClick={onClose}
            >
              ✗
            </button>
            <button
              type="submit"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-2xl font-bold text-white transition hover:scale-105 hover:bg-emerald-600"
            >
              ✓
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMediaModal;
