'use client'

import Modal from "../ui/Modal";
import { useMandelVillages } from "@/hooks/meta/useMandelVillages";
import { useState } from "react";
import { useWardsByLocation } from "@/hooks/meta/useWardsByLocation";
import Button from "../ui/Button";
export default function LocationPopup({ open, onClose, assemblies, onSelect,title}) {
    const [assemblyId, setAssemblyId] = useState(null);
    const [mandalId, setMandalId] = useState(null);
    const [villageId, setVillageId] = useState(null);
    const { mandelVillages } = useMandelVillages(assemblyId);
    const [wardId, setwardId] = useState(null);
    const mappedMandals =
        mandelVillages?.map((m) => ({
            id: m.mandal_id,
            name: m.mandal_name,
        })) || [];
    const selectedMandal =
        mandelVillages?.find(
            (m) => String(m.mandal_id) === String(mandalId)
        );
    const mappedVillages =
        selectedMandal?.villages?.map((v) => ({
            id: v.village_id,
            name: v.village_name,
        })) || [];
    const { wards } = useWardsByLocation(
        assemblyId,
        mandalId,
        villageId
    )
    console.log(wardId, "---")
    return (
        <Modal
            open={open}
            onClose={onClose}
            title={title}
            description="Set nomination and voting schedule carefully.">
            <div className="mb-4">
                <label className="text-sm font-medium">Assembly</label>
                <select
                    name="assembly_id"
                    required
                    value={assemblyId || ""}
                    onChange={(e) => {
                        setAssemblyId(Number(e.target.value));
                        setMandalId(null);
                    }}
                    className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                >
                    <option value="">Select Assembly</option>
                    {assemblies?.map((a) => (
                        <option key={a.id} value={a.id}>
                            {a.name}
                        </option>
                    ))}
                </select>
            </div>
            {assemblyId && (
                <div className="mb-4">
                    <label className="text-sm font-medium">Mandal</label>
                    <select
                        name="mandal_id"
                        required
                        value={mandalId || ""}
                        onChange={(e) => setMandalId(Number(e.target.value))}
                        className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
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
            {mandalId && (
                <div className="mb-4">
                    <label className="text-sm font-medium">Village</label>
                    <select
                        name="village_id"
                        required
                        value={villageId || ''}
                        onChange={(e) => setVillageId(Number(e.target.value))}
                        className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
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
            {wards && wards.length > 0 && (
                <div className="mb-4">
                    <label className="text-sm font-medium">Wards</label>
                    <select
                        name="ward_id"
                        required
                        value={wardId || ""}
                        onChange={(e) => setwardId(Number(e.target.value))}
                        className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                    >
                        <option value="">Select Ward</option>
                        {wards.map((w) => (
                            <option key={w.ward_id} value={w.ward_id}>
                                {w.ward_name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <Button
                onClick={() =>
                    onSelect({
                        assemblyId,
                        mandalId,
                        villageId,
                        wardId,
                    })
                }
            >
                OK
            </Button>
        </Modal>
    );
}