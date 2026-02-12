'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Modal from '../../components/ui/Modal'
import Button from '../../components/ui/Button'
import { useCreateElection } from '@/hooks/elections/useCreateElection'
import SuccessPopup from '../ui/SuccessPopup'

export default function CreateElectionModal({ open, onClose, assemblies }) {
  const router = useRouter()
  const { create, loading } = useCreateElection()
  const [showSuccess, setShowSuccess] = useState(false)

  const [form, setForm] = useState({
    title: '',
    assembly_id: '',

    nomination_date: '',
    nomination_start_time: '',
    nomination_end_time: '',

    voting_date: '',
    voting_start_time: '',
    voting_end_time: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  /**
   * IMPORTANT:
   * Send date & time EXACTLY as selected
   * No timezone conversion
   */
  const toAPIDatetime = (date, time) => {
    if (!date || !time) return null
    return `${date}T${time}:00.000Z`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      title: form.title,
      assembly_id: Number(form.assembly_id),

      nomination_start: toAPIDatetime(
        form.nomination_date,
        form.nomination_start_time
      ),
      nomination_end: toAPIDatetime(
        form.nomination_date,
        form.nomination_end_time
      ),

      voting_start: toAPIDatetime(
        form.voting_date,
        form.voting_start_time
      ),
      voting_end: toAPIDatetime(
        form.voting_date,
        form.voting_end_time
      ),
    }

    console.log('PAYLOAD SENT:', payload)

    const { success } = await create(payload)

    if (success) {
      onClose()
      window.location.reload()
      setShowSuccess(true)
      router.refresh()
    }
  }

  if (!open) return null

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        title="Create New Election"
        description="Set nomination and voting schedule carefully."
      >
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* TITLE */}
          <div>
            <label className="text-sm font-medium">Election Title</label>
            <input
              type="text"
              name="title"
              required
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
              placeholder="Ward Election 2026"
              onChange={handleChange}
            />
          </div>

          {/* ASSEMBLY */}
          <div>
            <label className="text-sm font-medium">Assembly</label>
            <select
              name="assembly_id"
              required
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
              onChange={handleChange}
            >
              <option value="">Select Assembly</option>
              {assemblies?.map(a => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          {/* NOMINATION DATE */}
          <div>
            <label className="text-sm font-medium">Nomination Date</label>
            <input
              type="date"
              name="nomination_date"
              required
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
              onChange={handleChange}
            />
          </div>

          {/* NOMINATION TIME */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Nomination Start Time</label>
              <input
                type="time"
                name="nomination_start_time"
                required
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Nomination End Time</label>
              <input
                type="time"
                name="nomination_end_time"
                required
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* VOTING DATE */}
          <div>
            <label className="text-sm font-medium">Voting Date</label>
            <input
              type="date"
              name="voting_date"
              required
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
              onChange={handleChange}
            />
          </div>

          {/* VOTING TIME */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Voting Start Time</label>
              <input
                type="time"
                name="voting_start_time"
                required
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Voting End Time</label>
              <input
                type="time"
                name="voting_end_time"
                required
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating…' : 'Create Election'}
            </Button>
          </div>

        </form>
      </Modal>

      <SuccessPopup
        open={showSuccess}
        title="Election Created"
        message="The election has been created successfully."
        onClose={() => {
          setShowSuccess(false)
          router.refresh()
        }}
      />
    </>
  )
}
