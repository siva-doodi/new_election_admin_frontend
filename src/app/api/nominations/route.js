import { NextResponse } from 'next/server'
import { getAuthToken } from '../../../lib/serverAuth'
import { fetchNominations } from '../../../lib/nominations/nominations.server'
export async function GET(req) {
  try {
    const token = await getAuthToken()
    const { searchParams } = new URL(req.url)
    const filters = Object.fromEntries(searchParams.entries())
    const nominations = await fetchNominations(token,filters)
    return NextResponse.json(nominations)
  } catch (error) {
    console.error('[META_ASSEMBLIES]', error)
    return NextResponse.json(
      {
        message: 'to load nominations',
      },
      { status: 401 }
    )
  }
}
