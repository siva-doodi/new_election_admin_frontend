import { NextResponse } from 'next/server'
import { getAuthToken } from '@/lib/serverAuth'
import { fetchGetWardsByLocation } from '@/lib/meta/wards/wards.server'

export async function GET(request) {
  try {
    const token = await getAuthToken()

    if (!token) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)

    const assemblyId = searchParams.get('assembly_id')
    const mandalId = searchParams.get('mandal_id')
    const villageId = searchParams.get('village_id')

    const wards = await fetchGetWardsByLocation(
      token,
      assemblyId,
      mandalId,
      villageId
    )

    return NextResponse.json(wards)
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { message: 'Server Error' },
      { status: 500 }
    )
  }
}
