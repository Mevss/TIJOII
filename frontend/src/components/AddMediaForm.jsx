import { useState } from 'react';
import toast from 'react-hot-toast';
import { validateTags, validateDescription, ALLOWED_TAGS } from '../utils/allowedTags';

const AddMediaForm = ({ onAddMedia }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'book',
    image: '',
    tags: '',
    rating: 1,
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
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
      setFormData({
        title: '',
        type: 'book',
        image: '',
        tags: '',
        rating: 1,
        description: ''
      });
      return;
    }

    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag);

    const tagsValidation = validateTags(tagsArray);
    if (!tagsValidation.valid) {
      toast.error(`Tag "${tagsValidation.invalidTag}" not allowed (${ALLOWED_TAGS.join(', ')})`);
      setFormData({
        title: '',
        type: 'book',
        image: '',
        tags: '',
        rating: 1,
        description: ''
      });
      return;
    }

    const rating = parseInt(formData.rating);
    if (!rating || rating < 1 || rating > 5) {
      toast.error('Rating needs 1-5');
      setFormData({
        title: '',
        type: 'book',
        image: '',
        tags: '',
        rating: 1,
        description: ''
      });
      return;
    }

    const newMedia = {
      id: Date.now().toString(),
      title: formData.title,
      type: formData.type,
      image: formData.image || '/image1.jpg',
      tags: tagsArray,
      rating: rating,
      description: formData.description,
      comments: []
    };

    onAddMedia(newMedia);
    toast.success('Media added');

    setFormData({
      title: '',
      type: 'book',
      image: '',
      tags: '',
      rating: 1,
      description: ''
    });
  };

  const inputStyles =
    'w-full rounded-lg border-2 border-slate-200 px-3 py-2 text-sm text-slate-900 transition focus:border-sky-500 focus:outline-none';

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold text-slate-800">Add Local Media</h2>
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="type" className="text-sm font-semibold text-slate-700">
            Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={inputStyles}
          >
            <option value="book">Book</option>
            <option value="movie">Movie</option>
            <option value="game">Game</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-semibold text-slate-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={inputStyles}
            placeholder="Title..."
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="image" className="text-sm font-semibold text-slate-700">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            className={inputStyles}
            accept="image/*"
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="mt-3 h-48 w-36 rounded-lg border-2 border-slate-200 object-cover"
            />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-semibold text-slate-700">
            Description (max 100 chars)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`${inputStyles} min-h-[120px] resize-y`}
            rows="3"
            placeholder="Description..."
          />
          <small className="text-right text-xs font-medium text-slate-500">
            {formData.description.length}/100
          </small>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="tags" className="text-sm font-semibold text-slate-700">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className={inputStyles}
            placeholder="fantasy, drama, sci-fi etc"
          />
          <small className="text-sm text-slate-500">
            Allowed: {ALLOWED_TAGS.join(', ')}
          </small>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="rating" className="text-sm font-semibold text-slate-700">
            Rating (1-5)
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className={inputStyles}
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-emerald-600 px-5 py-3 text-base font-semibold text-white transition hover:bg-emerald-700"
        >
          Add to Collection
        </button>
      </form>
    </div>
  );
};

export default AddMediaForm;
