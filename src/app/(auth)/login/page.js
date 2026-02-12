'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!form.email || !form.password) {
      setError('Email and password are required')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        throw new Error('Login failed')
      }

      router.replace('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 space-y-5 shadow-lg"
      >
        {/* TITLE */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800">
            Admin Login
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Sign in to continue
          </p>
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="admin@example.com"
            value={form.email}
            onChange={e =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:ring-2 focus:ring-slate-200 outline-none"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={e =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:ring-2 focus:ring-slate-200 outline-none"
          />
        </div>

        {/* ERROR */}
        {error && (
          <div className="rounded-md bg-red-50 border border-red-200 px-3 py-2">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-secondary-red hover:bg-slate-800 text-white py-2.5 text-sm font-medium transition disabled:opacity-60"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}
