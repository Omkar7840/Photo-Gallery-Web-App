import { useEffect, useState } from 'react'

const PHOTOS_URL = 'https://picsum.photos/v2/list?limit=30'

function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadPhotos() {
      setLoading(true)
      setError('')

      try {
        const res = await fetch(PHOTOS_URL)

        if (!res.ok) {
          throw new Error('Failed to fetch photos')
        }

        const data = await res.json()
        if (!cancelled) {
          setPhotos(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Something went wrong')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadPhotos()

    return () => {
      cancelled = true
    }
  }, [])

  return { photos, loading, error }
}

export default useFetchPhotos
