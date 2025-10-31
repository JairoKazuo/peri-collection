"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRegister = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError("Completa todos los campos obligatorios.")
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.")
      return
    }

    setError("")
    localStorage.setItem("userData", JSON.stringify(formData))
    setSuccess(true)

    setTimeout(() => {
      router.push("/customer/login")
    }, 1500)
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground text-center mb-6">Crear cuenta</h1>

      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm mb-4">
          <XCircle className="w-4 h-4" /> {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 text-green-600 text-sm mb-4">
          <CheckCircle className="w-4 h-4" /> Registro exitoso
        </div>
      )}

      <div className="space-y-4">
        <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Nombre" className="w-full px-4 py-3 border border-border rounded-lg bg-card" />
        <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Apellido" className="w-full px-4 py-3 border border-border rounded-lg bg-card" />
        <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Correo electrónico" className="w-full px-4 py-3 border border-border rounded-lg bg-card" />
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Teléfono" className="w-full px-4 py-3 border border-border rounded-lg bg-card" />
        <input name="address" value={formData.address} onChange={handleChange} placeholder="Dirección" className="w-full px-4 py-3 border border-border rounded-lg bg-card" />
        <input name="city" value={formData.city} onChange={handleChange} placeholder="Ciudad" className="w-full px-4 py-3 border border-border rounded-lg bg-card" />
        <input name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Código postal" className="w-full px-4 py-3 border border-border rounded-lg bg-card" />
        <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Contraseña" className="w-full px-4 py-3 border border-border rounded-lg bg-card" />
        <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" placeholder="Confirmar contraseña" className="w-full px-4 py-3 border border-border rounded-lg bg-card" />
      </div>

      <Button onClick={handleRegister} className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 py-3 font-medium">Registrarse</Button>

      <p className="text-center text-sm text-muted-foreground mt-4">
        ¿Ya tienes cuenta? <Link href="/customer/login" className="text-accent hover:underline">Inicia sesión</Link>
      </p>
    </div>
  )
}
