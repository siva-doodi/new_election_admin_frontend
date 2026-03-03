import api from '@/lib/axios'
import { API_ROUTES } from '@/app/constants/apiRoutes'

export async function fetchGetWardsByLocation(
  token,
  assemblyId,
  mandalId,
  villageId
) {
  const res = await api.get(
    API_ROUTES.meta.wardsByLocation(
      assemblyId,
      mandalId,
      villageId
    ),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return res.data
}
