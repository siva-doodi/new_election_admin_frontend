'use client'

import { useState } from 'react'
import Button from '../ui/Button'
import { dashboardActions } from '../../../actions/dashboardActions'
import { useRouter } from 'next/navigation'
export default function Header() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [role, setRole] = useState('Super Admin')

  const roles = ['Super Admin', 'Admin', 'Viewer']

  return (
    <header className="sticky top-0 z-20 hidden lg:flex  w-full items-center justify-between bg-white border-b border-text-red px-6 py-2">

        <div>
          <img
          src="/images/47329.jpg"
          alt="JNSP"
          width="150"
        />
        </div>
        <div className='font-bold text-xl text-primary-red'>
          <h2>Janasena Party</h2>
        </div>
        <div>
          <img
            src="/images/image_jansanani.jfif"
            alt="JNSP"
            width="60"
          />
        </div>
      

    </header>
  )
}
