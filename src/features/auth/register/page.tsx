"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import type React from "react"
// Asegúrate de que la ruta sea correcta
import { Input } from '@/components/ui/input';
import { register as registerService } from "@/features/auth/services/auth.service";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    documentType: "", 
    document: "",
    celular: "",
    password: "",
    confirmPassword: ""
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const form = e.currentTarget
    const terms = (form.elements.namedItem("terms") as HTMLInputElement | null)?.checked
    if (!terms) {
      setError("Debes aceptar los términos y condiciones.")
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.")
      return
    }
    
    try {
      setLoading(true)
      const payload = {
        nombre_usuario: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        tipo_doc: formData.documentType, // "D" | "CE"
        documento: formData.document,
        telefono: formData.celular
      }
      await registerService<typeof payload, any>(payload)
      router.push("/auth/login")
    } catch (err: any) {
      const msg = err?.response?.data?.message || "No se pudo completar el registro."
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">Crear Cuenta</h1>
            <p className="text-muted-foreground">Únete a PERI COLLECTION hoy</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="full-name-input" 
                className="block text-sm font-medium text-foreground mb-2">Nombre Completo</label>
              <Input
                type="text"
                id="full-name-input"
                placeholder="Ingresa tu nombre completo"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div>
              <label 
                htmlFor="email-input" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Correo
              </label>
              <Input
                type="email"
                placeholder="Ingresa un correo"
                id="email-input"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div>
              <label 
                htmlFor="document-input"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Documento
              </label>
              <select id="tipo-documento" name="documentType" value={formData.documentType} onChange={handleChange} disabled={loading}>
                <option value="DNI">DNI</option>
                <option value="CE">CE</option>
              </select>
              <Input
                type="text"
                placeholder="Ingresa tu documento de identidad"
                id="document-input"
                name="document"
                value={formData.document}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div>
              <label
                htmlFor="celular-input"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Celular
              </label>
              <Input
                type="tel"
                placeholder="Ingresa tu número de celular"
                id="celular-input"
                name="celular"
                value={formData.celular}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div>
              <label   
                htmlFor="password-input" 
                className="block text-sm font-medium text-foreground mb-2"
              >
                Contraseña
              </label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese una contraseña"
                  id="password-input"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  className="pr-10"
                />
                <Button
                  type="button"
                  onClick={togglePasswordVisibility}
                  disabled={loading}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
            </div>
            <div>
              <label
                htmlFor="confirm-password-input"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Confirmar Contraseña
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirme su contraseña"
                  id="confirm-password-input"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                  className="pr-10"
                />
                <Button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  disabled={loading}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <input type="checkbox" id="terms" name="terms" className="rounded border-border mt-1" />
              <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                Acepto los términos y condiciones de PERI COLLECTION
              </label>
            </div>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 font-medium" disabled={loading}>
              Crear Cuenta
            </Button>
          </form>

          <div className="text-center">
            <p className="text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <Link href="/auth/login" className="text-accent font-semibold hover:underline">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

