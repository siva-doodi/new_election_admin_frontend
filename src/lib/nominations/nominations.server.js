'use server'
import api from '@/lib/axios'
import axios from "axios"
import { API_ROUTES } from '../../app/constants/apiRoutes'
import { cookies } from "next/headers"
export async function fetchNominations(token,filters) {
 
  const res = await api.get(API_ROUTES.nominations.list, {
     params: filters,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
 
  return res.data
}
 
export async function sendNominationNotificationServer(token, eventId) {
  if (!token) {
    throw new Error('Token is missing')
  }
 
  const res = await api.post(
    `/nominations/${eventId}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    }
  )
  return res.data   // ✅ THIS WAS MISSING
}
export async function approveCandidate(token, candidateId) {
  const res = await api.post(API_ROUTES.candidates.APPROVE_CANDIDATE(candidateId),
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  return res.data
}
 
 
 
 
export async function rejectNominationServer(id, reason) {
 
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("access_token")?.value
 
    if (!token) {
      throw new Error("Unauthorized")
    }
 
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/nominations/${id}/reject`,
      { reason },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
 
    return response.data
 
  } catch (error) {
    throw new Error(
      error.response?.data?.detail || "Reject failed"
    )
  }
}
 
 
