import { NextResponse } from 'next/server'
import { getAuthToken } from '@/lib/serverAuth'
import { createElectionServer } from '@/lib/elections/elections.server'

export async function POST(req) {
  try {
    // ⭐ API DEBUG NAME
    console.log('--- API HIT: /api/elections/create ---')
    const token = await getAuthToken()
    const body = await req.json()
    // ⭐ DEBUG PAYLOAD
    console.log('REQUEST BODY:', body)
    
    const result = await createElectionServer(token, body)

    console.log('CREATE SUCCESS')

    return NextResponse.json(result)
  } catch (error) {
    console.error('❌ [CREATE_ELECTION_ERROR]', error)

    return NextResponse.json(
      {
        message:
          error?.response?.data?.message ||
          error.message ||
          'Failed to create election',
      },
      { status: 422 }
    )
  }
}
