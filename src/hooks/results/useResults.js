'use client'
import { useEffect, useState } from 'react'
import { fetchResults } from '@/lib/results/results.client'
import { mapResultToCard } from '@/utils/results/resultsMapper'
export function useResults(locationFilter) {
  const [results, setResults] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchResults(locationFilter)
        setResults(data.items.map(mapResultToCard))
        setPagination(data.pagination)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [locationFilter])

  return {
    results,
    pagination,
    loading,
    error,
    clearError: () => setError(null),
  }
}
