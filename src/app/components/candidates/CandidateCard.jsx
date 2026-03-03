'use client'

import { Check, MapPin } from 'lucide-react'
import clsx from 'clsx'
import Image from 'next/image'

export default function CandidateCard({ candidate, onApprove, approvingId }) {
  const status = candidate.status?.toLowerCase() || 'pending'
 
  return (
    <div className="group relative bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
      
      {/* Top Gradient Header */}
      <div className="h-24 bg-primary-red from-green-600 via-emerald-500 to-teal-500 relative">
        <div className="absolute -bottom-12 left-6">
          <div className="relative w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg">
            <Image
              src="https://voting-application-1a.s3.us-east-1.amazonaws.com/Images/94a1ff5f-b50e-4666-a33a-e295df53a5d0.jpg"
              alt={candidate.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Status Badge */}
        <span
          className={clsx(
            'absolute top-4 right-4 px-4 py-1 rounded-full text-xs font-semibold capitalize shadow-md',
            status === 'pending' && 'bg-yellow-100 text-yellow-700',
            status === 'approved' && 'bg-green-100 text-green-700',
            status === 'rejected' && 'bg-red-100 text-red-700'
          )}
        >
          {status}
        </span>
      </div>

      {/* Content */}
      <div className="pt-16 px-6 pb-6">
        <h3 className="text-xl font-bold text-gray-800">
          {candidate.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
          <MapPin size={14} />
          <span>{candidate.location}</span>
        </div>

        {/* Bio */}
        <p className="mt-4 text-sm text-gray-600 leading-relaxed line-clamp-3">
          {candidate.bio || 'No description available.'}
        </p>

        {/* Approve Button */}
        {status !== 'approved' && (
          <button
            onClick={() => onApprove(candidate.id)}
            disabled={approvingId === candidate.id}
            className={clsx(
              'mt-6 w-full flex items-center justify-center gap-2 rounded-2xl py-3 font-semibold transition-all duration-300 shadow-md',
              approvingId === candidate.id
                ? 'bg-green-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:scale-105 hover:shadow-lg'
            )}
          >
            <Check size={18} />
            {approvingId === candidate.id
              ? 'Approving...'
              : 'Approve Candidate'}
          </button>
        )}

        {/* Approved State */}
        {status === 'approved' && (
          <div className="mt-6 text-center text-sm font-semibold text-green-700 bg-green-50 py-3 rounded-2xl">
            🎉 Candidate Approved
          </div>
        )}
      </div>
    </div>
  )
}
