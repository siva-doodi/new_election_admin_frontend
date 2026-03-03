'use client'

import { useEffect, useState } from 'react'
import { fetchWardsByLocation } from '@/lib/meta/wards/wards.client'

export function useWardsByLocation(
  assemblyId,
  mandalId,
  villageId
) {
  const [wards, setWards] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    if (!assemblyId || !mandalId || !villageId) return
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchWardsByLocation(
          assemblyId,
          mandalId,
          villageId
        )
        setWards(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [assemblyId, mandalId, villageId])

  return {
    wards,
    loading,
    error,
  }
}
