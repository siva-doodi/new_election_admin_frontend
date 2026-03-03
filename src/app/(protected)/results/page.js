'use client'
import { useState, useEffect } from 'react'
import DashboardHeader from '@/app/components/layout/DashboardHeader'
import FiltersBar from '@/app/components/ui/FiltersBar'
import ErrorModal from '@/app/components/ui/Alert'
import ResultsList from '@/app/components/results/ResultsList'
import { useResults } from '@/hooks/results/useResults'
import { useAssemblies } from '@/hooks/meta/useAssemblies'
import { publishResults } from '@/lib/results/results.client'
import LocationPopup from '@/app/components/elections/LocationPopUp'
import Button from '@/app/components/ui/Button'
export default function ResultsPage() {
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [electionLevel, setElectionLevel] = useState('all')
  const [assemblyId, setAssemblyId] = useState('all')

  const { assemblies} = useAssemblies()

  const [publishLoading, setPublishLoading] = useState(false)
  const [publishError, setPublishError] = useState(null)
  const [locationFilter, setLocationFilter] = useState(null);
  const [openLocationModel, setLocationModel] = useState(false)
  const {results,loading,error, clearError,} = useResults(locationFilter)
 const openLocation = () => setLocationModel(true)
    const closeLocation = () => setLocationModel(false)
  useEffect(() => {
    setPage(1)
  }, [electionLevel, assemblyId])

  const handlePublishResult = async (id) => {
    
    try {
      setPublishLoading(true)
      setPublishError(null)
      const res = await publishResults(Number(id))
      console.log('✅ PUBLISHED:', res)
    } catch (err) {
      console.error('❌ PUBLISH ERROR:', err)
      setPublishError(err)
    } finally {
      setPublishLoading(false)
    }
  }
  const handleLocationSelect = (data) => {
        setLocationFilter(data);
        setLocationModel(false);
    };
  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Election Results"
        para="View published election results and winners"
      />

      <FiltersBar
        action={<Button onClick={openLocation}>Location Pop Up</Button>}
      />

      {(error || publishError) && (
        <ErrorModal
          open
          message={(error || publishError)?.message}
          onClose={() => {
            clearError()
            setPublishError(null)
          }}
        />
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ResultsList
          results={results}
          onStatusClick={handlePublishResult}
          loading={publishLoading}
        />
      )}
      {
                      openLocationModel && (
                          <LocationPopup
                              open={openLocationModel}
                              onClose={closeLocation}
                              assemblies={assemblies}
                              onSelect={handleLocationSelect}
                              title= "Results"
                          />
                      )
                  }
    </div>
  )
}
