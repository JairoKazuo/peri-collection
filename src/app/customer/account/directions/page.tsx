"use client"

import { useFetchClientsInfo } from "@/hooks/useFetchClients"
import { Loader2 } from "lucide-react"

export default function DirectionsPage() {
    const { directions, isLoading, error } = useFetchClientsInfo()

    if (isLoading){
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="animate-spin" />
            </div>
        )
    }

    if (error){
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500">Error al cargar las direcciones</p>
            </div>
        )
    }
    if (directions.length === 0){
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500">No hay direcciones</p>
            </div>
        )
    }
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground mb-2">Mis Direcciones</h2>
            {directions.map((direction, index) => (
                <div key={index} className="border border-border rounded-xl p-6 bg-card">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="font-semibold text-foreground">{direction.calle}</h3>
                            <p className="text-sm text-muted-foreground">{direction.departamento}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-foreground">{direction.distrito}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
