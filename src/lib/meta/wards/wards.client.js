export async function fetchWardsByLocation(
  assemblyId,
  mandalId,
  villageId
) {
  const res = await fetch(
    `/api/meta/get_wards_by_location?assembly_id=${assemblyId}&mandal_id=${mandalId}&village_id=${villageId}`
  )

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch wards')
  }

  return data
}
