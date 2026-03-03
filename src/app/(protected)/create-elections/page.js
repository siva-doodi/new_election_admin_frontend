'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '../../components/ui/Button'
import { useCreateElection } from '@/hooks/elections/useCreateElection'
import SuccessPopup from '../../components/ui/SuccessPopup'
import { useAssemblies } from '@/hooks/meta/useAssemblies'
import { useMandelVillages } from '@/hooks/meta/useMandelVillages'
import { useWardsByLocation } from '@/hooks/meta/useWardsByLocation'

export default function CreateElectionPage() {
  const router = useRouter()
  const { create, loading } = useCreateElection()
  const [showSuccess, setShowSuccess] = useState(false)
  const { assemblies } = useAssemblies()

  const [form, setForm] = useState({
    title: '',
    assembly_id: '',
    mandal_id: '',
    village_id: '',
    ward_id: '',
    nomination_date: '',
    nomination_start_time: '',
    nomination_end_time: '',
    voting_date: '',
    voting_start_time: '',
    voting_end_time: '',
  })

  const { mandelVillages } = useMandelVillages(form.assembly_id)

  const { wards } = useWardsByLocation(
    form.assembly_id,
    form.mandal_id,
    form.village_id
  )
  const mappedMandals =
    mandelVillages?.map((m) => ({
      id: m.mandal_id,
      name: m.mandal_name,
    })) || []
  const selectedMandal = mandelVillages?.find(
    (m) => String(m.mandal_id) === String(form.mandal_id)
  )
  const mappedVillages =
    selectedMandal?.villages?.map((v) => ({
      id: v.village_id,
      name: v.village_name,
    })) || []
  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'assembly_id'
        ? { mandal_id: '', village_id: '', ward_id: '' }
        : {}),

      ...(name === 'mandal_id'
        ? { village_id: '', ward_id: '' }
        : {}),

      ...(name === 'village_id'
        ? { ward_id: '' }
        : {}),
    }))
  }

  const toAPIDatetime = (date, time) => {
    if (!date || !time) return null
    return `${date}T${time}:00.000Z`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
   
    const payload = {
      title: form.title,
      assembly_id: form.assembly_id ? Number(form.assembly_id) : null,
      mandal_id: form.mandal_id ? Number(form.mandal_id) : null,
      village_id: form.village_id ? Number(form.village_id) : null,
      ward_id: form.ward_id ? Number(form.ward_id) : null,
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
    console.log("Final Payload:", payload)
    const { success } = await create(payload)
    if (success) {
      setShowSuccess(true)
      router.refresh()
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
      <div className="max-w-4xl mx-auto mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Create New Election
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Set nomination and voting schedule carefully.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-md font-semibold mb-4 text-gray-800">
              Election Details
            </h2>
            <div className="space-y-4">

              <div>
                <label className="text-sm font-medium">Election Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="Ward Election 2026"
                  className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Assembly</label>
                <select
                  name="assembly_id"
                  required
                  value={form.assembly_id}
                  className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                  onChange={handleChange}
                >
                  <option value="">Select Assembly</option>
                  {assemblies?.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mandal */}
              {form.assembly_id && (
                <div>
                  <label className="text-sm font-medium">Mandal</label>
                  <select
                    name="mandal_id"
                    required
                    value={form.mandal_id}
                    className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                    onChange={handleChange}
                  >
                    <option value="">Select Mandal</option>
                    {mappedMandals.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Village */}
              {form.mandal_id && (
                <div>
                  <label className="text-sm font-medium">Village</label>
                  <select
                    name="village_id"
                    required
                    value={form.village_id}
                    className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                    onChange={handleChange}
                  >
                    <option value="">Select Village</option>
                    {mappedVillages.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Ward */}
              {form.village_id && (
                <div>
                  <label className="text-sm font-medium">Ward</label>
                  <select
                    name="ward_id"
                    required
                    value={form.ward_id}
                    className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                    onChange={handleChange}
                  >
                    <option value="">Select Ward</option>
                    {wards?.map((w) => (
                      <option key={w.ward_id} value={w.ward_id}>
                        {w.ward_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

            </div>
          </div>

          {/* Nomination */}
          <div>
            <h2 className="text-md font-semibold mb-4 text-gray-800">
              Nomination Schedule
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <input
                  type="date"
                  name="nomination_date"
                  required
                  className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                  onChange={handleChange}
                />
              </div>

              <input
                type="time"
                name="nomination_start_time"
                required
                className="rounded-md border px-3 py-2 text-sm"
                onChange={handleChange}
              />

              <input
                type="time"
                name="nomination_end_time"
                required
                className="rounded-md border px-3 py-2 text-sm"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Voting */}
          <div>
            <h2 className="text-md font-semibold mb-4 text-gray-800">
              Voting Schedule
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <input
                  type="date"
                  name="voting_date"
                  required
                  className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                  onChange={handleChange}
                />
              </div>

              <input
                type="time"
                name="voting_start_time"
                required
                className="rounded-md border px-3 py-2 text-sm"
                onChange={handleChange}
              />

              <input
                type="time"
                name="voting_end_time"
                required
                className="rounded-md border px-3 py-2 text-sm"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? 'Creating…' : 'Create Election'}
            </Button>
          </div>

        </form>
      </div>

      <SuccessPopup
        open={showSuccess}
        title="Election Created"
        message="The election has been created successfully."
        onClose={() => {
          setShowSuccess(false)
          router.push('/elections')
        }}
      />
    </div>
  )
}
