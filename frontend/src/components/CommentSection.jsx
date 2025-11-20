import React, { useState } from 'react';

const CommentSection = ({ comments, onAddComment, onDeleteComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="space-y-3">
      <h4 className="text-base font-semibold text-slate-800">Comments</h4>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-slate-300"
          disabled={!newComment.trim()}
        >
          Add
        </button>
      </form>
      <ul className="space-y-2">
        {comments.map((comment, index) => (
          <li key={index} className="flex items-center gap-3 rounded-lg border border-slate-100 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm">
            <span className="flex-1 break-words">{comment}</span>
            <button
              className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-base font-bold text-white transition hover:bg-rose-600"
              onClick={() => onDeleteComment(index)}
              type="button"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
