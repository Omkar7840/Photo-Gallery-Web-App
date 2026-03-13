export const FAV_LOCAL_KEY = 'photo-gallery-favourites'

export function loadInitialFavourites() {
  try {
    const stored = localStorage.getItem(FAV_LOCAL_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAV': {
      const id = action.payload
      const alreadyFav = state.includes(id)

      if (alreadyFav) {
        return state.filter(itemId => itemId !== id)
      } else {
        return [...state, id]
      }
    }
    default:
      return state
  }
}
