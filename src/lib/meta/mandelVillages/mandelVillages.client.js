export async function fetchMandelVillages(id) {
  const res = await fetch(`/api/meta/get_mandel_villages/${id}`)

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'failed to fetch MandelVillages')
  }

  return data
}
