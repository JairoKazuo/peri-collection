"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">Crear Cuenta</h1>
            <p className="text-muted-foreground">Únete a PERI COLLECTION hoy</p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nombre Completo</label>
              <input
                type="text"
                placeholder="Juan Pérez"
                className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Correo Electrónico</label>
              <input
                type="email"
                placeholder="tu@ejemplo.com"
                className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Confirmar Contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              />
            </div>
            <div className="flex items-start gap-2">
              <input type="checkbox" id="terms" className="rounded border-border mt-1" />
              <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                Acepto los términos y condiciones de PERI COLLECTION
              </label>
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 font-medium">
              Crear Cuenta
            </Button>
          </form>

          <div className="text-center">
            <p className="text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <Link href="/customer/login" className="text-accent font-semibold hover:underline">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
