'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Save email in cookies
  const handleLogin = e => {
    e.preventDefault()

    // store email in cookie (valid for 1 day)
    document.cookie = `userEmail=${email}; path=/; max-age=${60 * 60 * 24}`

    alert('Email stored in cookies')
  }

  // Read email from cookies
  const handleGetCookie = () => {
    const cookies = document.cookie.split('; ')
    const emailCookie = cookies.find(c =>
      c.startsWith('userEmail=')
    )

    if (emailCookie) {
      const emailValue = emailCookie.split('=')[1]
      alert(`Email from cookie: ${emailValue}`)
    } else {
      alert('No email cookie found')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80 space-y-4">
        <h2 className="text-xl font-bold text-center">Login</h2>

        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Login
          </button>
        </form>

        <button
          onClick={handleGetCookie}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Get Email From Cookie
        </button>
      </div>
    </div>
  )
}
