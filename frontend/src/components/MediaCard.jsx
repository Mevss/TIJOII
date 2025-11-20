import { useState } from 'react';
import StarRating from './StarRating';
import CommentSection from './CommentSection';
import EditMediaModal from './EditMediaModal';

const MediaCard = ({ media, onUpdateRating, onDelete, onAddComment, onDeleteComment, onEdit }) => {
  const [showNotes, setShowNotes] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = (updates) => {
    onEdit(media.id, updates);
    setShowEditModal(false);
  };

  return (
    <div className="flex min-h-[640px] flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-card">
      <div className="mb-3 flex items-center justify-end gap-3">
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-lg text-white transition hover:bg-sky-600"
          onClick={() => setShowEditModal(true)}
        >
          ✎
        </button>
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-500 text-xl text-white transition hover:bg-rose-600"
          onClick={() => onDelete(media.id)}
        >
          ×
        </button>
      </div>

      {media.image && (
        <img
          src={media.image}
          alt={media.title}
          className="mb-4 h-80 w-full rounded-lg object-cover"
        />
      )}

      <div className="flex flex-1 flex-col">
        <h3 className="text-xl font-semibold text-slate-800">{media.title}</h3>

        <p className="mt-2 text-sm text-slate-600">
          {media.description || 'No description'}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <StarRating
            rating={media.rating || 0}
            onRatingChange={(newRating) => onUpdateRating(media.id, newRating)}
          />
          <span className="rounded-full bg-slate-700 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {media.type}
          </span>
        </div>

        {media.tags && media.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {media.tags.map((tag, index) => (
              <span key={index} className="rounded-full bg-sky-500 px-3 py-1 text-xs font-semibold text-white">
                {tag}
              </span>
            ))}
          </div>
        )}

        <button
          className="mt-4 rounded-lg bg-slate-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          onClick={() => setShowNotes(!showNotes)}
          type="button"
        >
          {showNotes ? 'Hide Notes' : `Show Notes (${media.comments?.length || 0})`}
        </button>

        {showNotes && (
          <div className="mt-4">
            <CommentSection
              comments={media.comments || []}
              onAddComment={(comment) => onAddComment(media.id, comment)}
              onDeleteComment={(commentIndex) => onDeleteComment(media.id, commentIndex)}
            />
          </div>
        )}
      </div>

      {showEditModal && (
        <EditMediaModal
          media={media}
          onSave={handleEdit}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default MediaCard;
