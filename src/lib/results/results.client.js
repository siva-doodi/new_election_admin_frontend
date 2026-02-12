export async function fetchResults({
  page,
  limit,
  election_level,
  assembly_id,
}) {
  const params = new URLSearchParams()

  params.append('page', page)
  params.append('limit', limit)

  if (election_level && election_level !== 'all') {
    params.append('election_level', election_level)
  }

  if (assembly_id && assembly_id !== 'all') {
    params.append('assembly_id', assembly_id)
  }

  const res = await fetch(`/api/results?${params.toString()}`, {
    credentials: 'include',
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch results')
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
