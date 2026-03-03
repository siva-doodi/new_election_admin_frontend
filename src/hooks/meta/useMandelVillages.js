'use client'

import { useEffect, useState } from 'react'
import { fetchMandelVillages } from '@/lib/meta/mandelVillages/mandelVillages.client'

export function useMandelVillages(id) {
  const [mandelVillages, setMandelVillages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    async function load() {
      try {
        setLoading(true)
        setError(null)

        const data = await fetchMandelVillages(id)
        setMandelVillages(data)   // ✅ set data correctly
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [id]) // ✅ dependency required

  return {
    mandelVillages,
    loading,
    error,
  }
}
