import { NextResponse } from 'next/server'
import { getAuthToken } from '../../../lib/serverAuth'
import { listElections} from '../../../lib/elections/elections.server'
export async function GET(req) {
  try {
    const token = await getAuthToken()
    const { searchParams } = new URL(req.url)
    const filters = Object.fromEntries(searchParams.entries())
    const elections = await listElections(token, filters)
    return NextResponse.json(elections)
  } catch (error) {
    return NextResponse.json(
      { message: error.message || 'Unauthorized' },
      { status: 401 }
    )
  }
}
