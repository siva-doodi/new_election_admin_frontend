'use client'

import { useState } from 'react'
import ElectionsList from '../../components/elections/ElectionsList'
import DashboardHeader from '../../components/layout/DashboardHeader'
import Button from '../../components/ui/Button'
import ErrorModal from '../../components/ui/Alert'
import CreateElectionModal from '../../components/elections/CreateElectionModal'
import { useElections } from '@/hooks/elections/useElections'
import { useAssemblies } from '../../../hooks/meta/useAssemblies'
import FiltersBar from '@/app/components/ui/FiltersBar'
import ElectionsListSkeleton from '@/app/components/Shimmer/ElectionsListSkeleton'
import LocationPopup from '@/app/components/elections/LocationPopUp'
import { useRouter } from "next/navigation";
export default function ElectionsPage() {
      const router = useRouter();
    const [openCreate, setOpenCreate] = useState(false)
    const [openLocationModel, setLocationModel] = useState(false)
    const { assemblies } = useAssemblies()
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('all')
    const [level, setLevel] = useState('all')
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [locationFilter, setLocationFilter] = useState(null);
    const { elections, loading, error, clearError } = useElections(locationFilter)

    // const openModal = () => setOpenCreate(true)
    const closeModal = () => setOpenCreate(false)
    const openLocation = () => setLocationModel(true)
    const closeLocation = () => setLocationModel(false)
    const handleLocationSelect = (data) => {
        setLocationFilter(data);
        setLocationModel(false);
    };
     const openModal = () => {
    router.push("/create-elections");
  };
    return (
        <div className="space-y-6">
            <DashboardHeader
                title="Elections"
                para="You have full administrative access"
                action={<Button onClick={openModal}>+ Create</Button>}
            />
            <FiltersBar
                search={search}
                onSearchChange={setSearch}
                filters={[
                    {
                        key: 'status',
                        value: status,
                        onChange: setStatus,
                        options: [
                            { label: 'All Status', value: 'all' },
                            { label: 'Active', value: 'ACTIVE' },
                            { label: 'Scheduled', value: 'SCHEDULED' },
                            { label: 'Draft', value: 'DRAFT' },
                            { label: 'COMPLETED', value: 'COMPLETED' }
                        ],
                    },
                    // {
                    //     key: 'level',
                    //     value: level,
                    //     onChange: setLevel,
                    //     options: [
                    //         { label: 'All Levels', value: 'all' },
                    //         { label: 'District', value: 'district' },
                    //         { label: 'Assembly', value: 'assembly' },
                    //     ],
                    // },
                ]}
                action={<Button onClick={openLocation}>Location Pop Up</Button>}
            />
            {error && (
                <ErrorModal
                    open
                    message={error.message}
                    onClose={clearError}
                    
                />
            )}
            {loading ? (
                <ElectionsListSkeleton />
            ) : (
                <ElectionsList elections={elections} />
            )}
            {openCreate && (
                <CreateElectionModal
                    open={openCreate}
                    onClose={closeModal}
                    assemblies={assemblies}
                   
                />
            )}
            {
                openLocationModel && (
                    <LocationPopup
                        open={openLocationModel}
                        onClose={closeLocation}
                        assemblies={assemblies}
                        onSelect={handleLocationSelect}
                        title= "Elections"
                    />
                )
            }
        </div>
    )
}
