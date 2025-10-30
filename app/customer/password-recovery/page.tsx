"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"

export default function PasswordRecoveryPage() {
  const [step, setStep] = useState<"email" | "code" | "reset">("email")

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link href="/customer/login" className="inline-flex items-center gap-2 text-accent hover:text-accent/90 mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Volver a Iniciar Sesión</span>
        </Link>

        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">Recuperar Contraseña</h1>
            <p className="text-muted-foreground">Te ayudaremos a recuperar el acceso a tu cuenta</p>
          </div>

          {step === "email" && (
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="tu@ejemplo.com"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                />
              </div>
              <Button
                type="button"
                onClick={() => setStep("code")}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 font-medium"
              >
                Enviar Código
              </Button>
            </form>
          )}

          {step === "code" && (
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Código de Verificación</label>
                <p className="text-sm text-muted-foreground mb-3">Ingresa el código que enviamos a tu correo</p>
                <input
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all text-center text-2xl tracking-widest"
                />
              </div>
              <Button
                type="button"
                onClick={() => setStep("reset")}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 font-medium"
              >
                Verificar Código
              </Button>
            </form>
          )}

          {step === "reset" && (
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nueva Contraseña</label>
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
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 font-medium">
                Actualizar Contraseña
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
