import { NextResponse } from 'next/server'
import { getAuthToken } from '@/lib/serverAuth'
import { submitPublishResult } from '@/lib/results/results.server'

export async function POST(req, context) {
  try {
    const token = await getAuthToken()

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // 🔴 IMPORTANT FIX: await params
    const params = await context.params
    const publishId = Number(params.publishId)

    console.log('PUBLISH ID:', publishId)

    if (!Number.isInteger(publishId)) {
      return NextResponse.json(
        { message: 'Invalid nomination id' },
        { status: 400 }
      )
    }

    const result = await submitPublishResult(token, publishId)

    return NextResponse.json(result)
  } catch (err) {
    console.error('PUBLISH ROUTE ERROR:', err)

    return NextResponse.json(
      { message: err.message || 'Failed to publish result' },
      { status: 422 }
    )
  }
}
