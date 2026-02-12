/**
 * Maps backend election result → UI card model
 */
export function mapResultToCard(result) {
  const totalVotes = Number(result.total_votes ?? 0)
  const winnerVotes = Number(result.winner_votes ?? 0)

  // 📍 Build readable location safely
  const locationParts = []

  if (result.ward_number) {
    locationParts.push(`Ward ${result.ward_number}`)
  }
  if (result.village_name) {
    locationParts.push(result.village_name)
  }
  if (result.mandal_name) {
    locationParts.push(result.mandal_name)
  }
  if (result.district_name) {
    locationParts.push(result.district_name)
  }

  return {
    /* Identity */
    id: result.election_id,
    title: result.title,
    level: result.election_level?.toLowerCase(),

    /* Location */
    location: locationParts.join(', '),
    state: result.state_name ?? null,
    district: result.district_name ?? null,
    assembly: result.assembly_name ?? null,
    mandal: result.mandal_name ?? null,
    village: result.village_name ?? null,
    wardNumber: result.ward_number ?? null,

    /* Voting info */
    totalVotes,
    votesCast: totalVotes, // backend defines this as total votes
    winnerVotes,

    // use backend percentage (more accurate)
    winnerVotePercent: Number(result.percentage ?? 0),

    /* Winner */
    winner: result.winner_name ?? '—',
    winnerParty: null, // not provided by API

    /* Candidates */
    candidates: Array.isArray(result.candidates)
      ? result.candidates.map(c => ({
          name: c.name,
          votes: Number(c.votes ?? 0),
          isWinner: Boolean(c.is_winner),
        }))
      : [],

    /* Status & timestamps */
    status: result.result_published ? 'published' : 'pending',
    isPublished: Boolean(result.result_published),
    publishedAt: result.result_published_at ?? null,
    createdAt: result.created_at ?? null,
  }
}
