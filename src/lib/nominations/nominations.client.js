export async function fetchNominations(locationFilter) {
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
    ? `/api/nominations?${queryString}`
    : `/api/nominations`

  const res = await fetch(url)
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.message || 'Failed to fetch elections')
  }

  return res.json()
}
export async function sendNominationNotificationClient(eventId) {
  if (!Number.isInteger(eventId)) {
    throw new Error('Invalid event id')
  }
  const res = await fetch(`/api/nominations/${eventId}`, {
    method: 'POST',
    credentials: 'include', // keep this
  })
  const text = await res.text()
  const data = text ? JSON.parse(text) : null

  if (!res.ok) {
    let message = 'Failed to send notification'

    if (data?.message) {
      message = data.message
    } else if (data?.detail) {
      if (Array.isArray(data.detail)) {
        message = data.detail.map(d => d.msg).join(', ')
      } else {
        message = data.detail
      }
    }

    throw new Error(message)
  }
  return data ?? { message: 'Notification sent successfully' }
}
export async function statusApprove(nominationId) {
  if (!Number.isInteger(nominationId)) {
    throw new Error('Invalid nomination id')
  }
  const res = await fetch(
    `/api/nominations/approve/${nominationId}/approve`,
    {
      method: 'POST',
      credentials: 'include', 
    }
  )

  const text = await res.text()
  const data = text ? JSON.parse(text) : null

  if (!res.ok) {
    throw {
      message:
        data?.message || 'Failed to approve nomination',
      status: res.status,
    }
  }

  return data
}
export async function statusReject(id, reason) {
  const res = await fetch(
    `/api/nominations/${id}/reject`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reason, 
      }),
    }
  )

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Reject failed')
  }

  return data
}


