export async function fetchResults(locationFilter) {
  const params = {}
  if (locationFilter?.assemblyId)
    params.assembly_id = locationFilter.assemblyId
  if (locationFilter?.mandalId)
    params.mandal_id = locationFilter.mandalId
  if (locationFilter?.villageId)
    params.village_id = locationFilter.villageId
  if (locationFilter?.wardId)
    params.ward_id = locationFilter.wardId
  const queryString = new URLSearchParams(params).toString()

  const url = queryString
    ? `/api/results?${queryString}`
    : `/api/results`

  const res = await fetch(url)

  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.message || 'Failed to fetch elections')
  }

  return res.json()
}
export async function createElectionClient(payload) {
  const res = await fetch('/api/elections/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Create election failed')
  }

  return data
}
export async function publishResults(publishId) {
  
  const id = Number(publishId)

  if (!Number.isInteger(id)) {
    throw new Error('Invalid nomination id')
  }

  const res = await fetch(
    `/api/results/publish/${id}/publish`,
    {
      method: 'POST',
      credentials: 'include',
    }
  )

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data?.message || 'Failed to publish result')
  }

  return data
}
