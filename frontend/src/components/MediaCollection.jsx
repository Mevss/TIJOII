import MediaCard from './MediaCard';

const MediaCollection = ({
  mediaList,
  onUpdateRating,
  onDelete,
  onAddComment,
  onDeleteComment,
  onEdit
}) => {
  if (!mediaList || mediaList.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-800">My Collection</h2>
        <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-slate-500">
          No media in your collection yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-800">My Collection</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mediaList.map((media) => (
          <MediaCard
            key={media.id}
            media={media}
            onUpdateRating={onUpdateRating}
            onDelete={onDelete}
            onAddComment={onAddComment}
            onDeleteComment={onDeleteComment}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default MediaCollection;
