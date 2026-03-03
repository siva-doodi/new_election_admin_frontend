import { NextResponse } from 'next/server'
import { getAuthToken } from '@/lib/serverAuth'
import { fetchGetMandelVillages } from '@/lib/meta/mandelVillages/mandelVillages.server'

export async function GET(request, context) {
  try {
    const token = await getAuthToken()

    // ⭐ FIX — await params
    const params = await context.params
    const id = params.id
console.log(id,"iddd")
    console.log(id, 'route.js')

    if (!token) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      )
    }

    const mandelVillages = await fetchGetMandelVillages(token, id)

    return NextResponse.json(mandelVillages)
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { message: 'Server Error' },
      { status: 500 }
    )
  }
}
