'use client'

import { useState } from "react"
import { rejectNominationServer } from "@/lib/nominations/nominations.server"

export const useRejectCandidate = (id,reason) => {
  const [loading, setLoading] = useState(false)

  const reject = async (id, reason) => {
    try {
      setLoading(true)
      const res = await rejectNominationServer(id, reason)
      return res
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { reject, loading }
}