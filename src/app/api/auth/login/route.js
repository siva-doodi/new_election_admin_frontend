import { NextResponse } from 'next/server'
import api from '@/lib/axios'

export async function POST(req) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password required' },
        { status: 400 }
      )
    }
    const backendRes = await api.post('/auth/admin/login', {
      email,
      password,
    })
    const { access_token, admin_id } = backendRes.data
    const res = NextResponse.json({
      success: true,
      admin_id,
    })
    res.cookies.set('access_token', access_token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production', 
    })
    return res
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message || 'Unable to load elections',
        code: 'ELECTIONS_FETCH_FAILED',
      },
      { status: 401 }
    )

  }
}
