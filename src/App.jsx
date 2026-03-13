import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import useFetchPhotos from './hooks/useFetchPhotos'
import PhotoCard from './components/PhotoCard'
import {
  favouritesReducer,
  loadInitialFavourites,
  FAV_LOCAL_KEY,
} from './reducers/favouritesReducer'

function App() {
  const { photos, loading, error } = useFetchPhotos()

  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    [],
    () => loadInitialFavourites()
  )

  useEffect(() => {
    try {
      localStorage.setItem(FAV_LOCAL_KEY, JSON.stringify(favourites))
    } catch {

    }
  }, [favourites])

  const [searchText, setSearchText] = useState('')

  const handleSearchChange = useCallback((event) => {
    setSearchText(event.target.value)
  }, [])

  const filteredPhotos = useMemo(() => {
    const text = searchText.trim().toLowerCase()
    if (!text) return photos
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(text)
    )
  }, [photos, searchText])

  const handleToggleFavourite = useCallback((id) => {
    dispatch({ type: 'TOGGLE_FAV', payload: id })
  }, [])

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Photo Gallery Web App
            </h1>
            <p className="text-sm text-slate-500">
              Browse photos, search by author, and mark your favourites.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                placeholder="Search by author..."
                className="w-56 md:w-72 rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="hidden sm:flex items-center gap-1 text-sm text-slate-600">
              <span>♥</span>
              <span>{favourites.length}</span>
              <span className="hidden md:inline">favourites</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {loading && (
          <div className="flex justify-center py-10">
            <div className="flex flex-col items-center gap-3">
              <div className="h-10 w-10 border-4 border-slate-300 border-t-blue-500 rounded-full animate-spin" />
              <p className="text-sm text-slate-500">Loading photos...</p>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            <p className="text-sm font-medium">Failed to load photos.</p>
            <p className="text-xs mt-1">{error}</p>
          </div>
        )}

        {!loading && !error && filteredPhotos.length === 0 && (
          <p className="text-sm text-slate-600">
            No photos match your search.
          </p>
        )}

        {!loading && !error && filteredPhotos.length > 0 && (
          <section
            aria-label="Photo Gallery"
            className="grid gap-4 mt-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          >
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavourite={favourites.includes(photo.id)}
                onToggleFavourite={handleToggleFavourite}
              />
            ))}
          </section>
        )}
      </main>
    </div>
  )
}

export default App
