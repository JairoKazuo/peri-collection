"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">Iniciar Sesión</h1>
            <p className="text-muted-foreground">Accede a tu cuenta de PERI</p>
          </div>

          <form className="space-y-5">
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
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="rounded border-border" />
              <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                Recuérdame
              </label>
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 font-medium">
              Iniciar Sesión
            </Button>
          </form>

          <div className="space-y-3">
            <Link href="/customer/password-recovery">
              <Button variant="ghost" className="w-full text-accent hover:text-accent/90">
                ¿Olvidaste tu contraseña?
              </Button>
            </Link>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">O</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-3">
              ¿No tienes cuenta?{" "}
              <Link href="/customer/register" className="text-accent font-semibold hover:underline">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
