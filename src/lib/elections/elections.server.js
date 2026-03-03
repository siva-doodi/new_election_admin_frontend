import api from '@/lib/axios'
import { API_ROUTES } from '../../app/constants/apiRoutes'

export async function listElections(token, filters) {

  const res = await api.get(API_ROUTES.elections.list, {
    params: filters,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data
}
export async function createElectionServer(token, payload) {
    console.log('CREATE API:', API_ROUTES.elections.create)
  const res = await api.post(
    API_ROUTES.elections.create,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return res.data
}
