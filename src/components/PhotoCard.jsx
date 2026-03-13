function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
      <div className="relative">
        <img
          src={photo.download_url}
          alt={photo.author}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <button
          onClick={() => onToggleFavourite(photo.id)}
          className="absolute top-2 right-2 rounded-full bg-white/90 p-1 hover:bg-white transition"
          aria-label="Toggle favourite"
        >
          <span className={isFavourite ? 'text-red-500' : 'text-slate-400'}>
            {isFavourite ? '♥' : '♡'}
          </span>
        </button>
      </div>

      <div className="px-3 py-2 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-800 truncate">
          {photo.author}
        </p>
        <a
          href={photo.url}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-blue-500 hover:underline"
        >
          Source
        </a>
      </div>
    </div>
  )
}

export default PhotoCard
