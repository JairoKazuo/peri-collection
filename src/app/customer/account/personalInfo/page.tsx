"use client"

import { Input } from "@/components/ui/input"
import { useFetchClientsInfo } from "@/hooks/useFetchClients"
import { Loader2 } from "lucide-react"

export default function PersonalInfoPage() {


  const { personalInfo, isLoading, error } = useFetchClientsInfo()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  if (error) {
    return <p className="text-red-500">Error al cargar datos personales: {error}</p>
  }

  if (!personalInfo) {
    return <p className="text-muted-foreground">No se encontraron datos personales</p>
  }

  return (
    <div className="border border-border rounded-xl p-6 bg-card">
      <h2 className="text-2xl font-semibold text-foreground mb-6">Información Personal</h2>
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Nombre Completo</label>
          <Input type="text" defaultValue={personalInfo.nombres_completos} disabled={true}/>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Correo Electrónico</label>
          <Input type="email" defaultValue={personalInfo.email} disabled={true}/>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Documento</label>
          <Input type="text" defaultValue={personalInfo.tipo_documento + " " + personalInfo.numero_documento} disabled={true}/>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Teléfono</label>
          <Input type="tel" defaultValue={personalInfo.telefono} disabled={true}/>
        </div>
      </div>
    </div>
  )
}
