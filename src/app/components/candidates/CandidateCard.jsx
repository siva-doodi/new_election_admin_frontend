'use client'

import { Check } from 'lucide-react'
import clsx from 'clsx'
import Image from 'next/image'

export default function CandidateCard({ candidate, onApprove, approvingId }) {
  const status = candidate.status?.toLowerCase() || 'pending'

  return (
    <div className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden w-full max-w-sm">
      
      {/* IMAGE */}
      <div className="relative h-56 w-full bg-gray-100">
        <Image
          src={candidate.profilePhoto || '/avatar-placeholder.png'}
          alt={candidate.name}
          fill
          className="object-cover"
        />
        <span
          className={clsx(
            'absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold capitalize',
            status === 'pending' && 'bg-orange-100 text-orange-700',
            status === 'approved' && 'bg-green-100 text-green-700',
            status === 'rejected' && 'bg-red-100 text-red-700'
          )}
        >
          {status}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col h-full">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {candidate.name}
        </h3>
        <span className='text-sm'>{candidate.location}</span>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {candidate.bio || 'No description available.'}
        </p>

        {/* APPROVE BUTTON */}
        {status !== 'approved' && (
  <button
    onClick={() => onApprove(candidate.id)}
    disabled={approvingId === candidate.id}
    className={clsx(
      'mt-6 w-full flex items-center justify-center gap-2 rounded-xl py-2.5 font-medium transition',
      approvingId === candidate.id
        ? 'bg-green-400 cursor-not-allowed'
        : 'bg-green-700 hover:bg-green-800 text-white'
    )}
  >
    <Check size={18} />
    {approvingId === candidate.id
      ? 'Approving...'
      : 'Approve Candidate'}
  </button>
)}


        {/* APPROVED STATE */}
        {status === 'approved' && (
          <div className="mt-6 text-center text-sm font-semibold text-green-700 bg-green-50 py-2.5 rounded-xl">
            ✔ Candidate Approved
          </div>
        )}
      </div>
    </div>
  )
}
