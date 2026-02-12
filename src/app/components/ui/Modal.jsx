'use client'

import { useEffect } from 'react'

export default function Modal({ open, title, description, onClose, children }) {
  // 🔒 Prevent background scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal box */}
      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-xl
                      max-h-[90vh] flex flex-col">

        {/* Header (sticky) */}
        <div className="flex items-start justify-between p-6 border-b sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-lg font-semibold text-heading">
              {title}
            </h2>
            {description && (
              <p className="text-sm text-paragraph mt-1">
                {description}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  )
}
