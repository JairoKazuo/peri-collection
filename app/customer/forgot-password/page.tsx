"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [step, setStep] = useState<"email" | "code" | "newPassword">("email")
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleNext = () => {
    if (step === "email" && email) setStep("code")
    else if (step === "code" && code) setStep("newPassword")
    else if (step === "newPassword" && newPassword) {
      setSuccess(true)
      setTimeout(() => router.push("/customer/login"), 1500)
    } else setError("Completa los campos.")
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground text-center mb-6">
        {step === "email" ? "Recuperar contraseña" : step === "code" ? "Verifica tu código" : "Nueva contraseña"}
      </h1>
      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm mb-4">
          <XCircle className="w-4 h-4" /> {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 text-green-600 text-sm mb-4">
          <CheckCircle className="w-4 h-4" /> Contraseña actualizada correctamente
        </div>
      )}
      {step === "email" && (
        <div className="space-y-4">
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo electrónico" className="w-full px-4 py-3 border border-border rounded-lg bg-card" />
          <Button onClick={handleNext} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 font-medium">Enviar código</Button>
        </div>
      )}
      {step === "code" && (
        <div className="space-y-4">
          <input value={code} onChange={e => setCode(e.target.value)} placeholder="Código de verificación" className="w-full px-4 py-3 border border-border rounded-lg bg-card" />
          <Button onClick={handleNext} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 font-medium">Verificar</Button>
        </div>
      )}
      {step === "newPassword" && (
        <div className="space-y-4">
          <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Nueva contraseña" className="w-full px-4 py-3 border border-border rounded-lg bg-card" />
          <Button onClick={handleNext} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 font-medium">Actualizar contraseña</Button>
        </div>
      )}
    </div>
  )
}

