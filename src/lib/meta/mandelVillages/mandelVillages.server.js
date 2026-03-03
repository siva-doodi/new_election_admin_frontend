import api from "@/lib/axios";
import { API_ROUTES } from '@/app/constants/apiRoutes'

export async function fetchGetMandelVillages(token, id) {
  const res = await api.get(API_ROUTES.meta.mandelVillages(id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data
}
