export async function fetchElections(locationFilter) {

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
    ? `/api/elections?${queryString}`
    : `/api/elections`

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
