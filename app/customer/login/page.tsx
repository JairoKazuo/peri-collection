"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleLogin = () => {
    const storedUser = localStorage.getItem("userData")
    if (!storedUser) {
      setError("No se encontró ninguna cuenta registrada.")
      return
    }

    const user = JSON.parse(storedUser)
    if (email === user.email && password === user.password) {
      setError("")
      setSuccess(true)
      localStorage.setItem("activeUser", JSON.stringify(user))
      setTimeout(() => router.push("/customer/account"), 1500)
    } else {
      setError("Correo o contraseña incorrectos.")
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground text-center mb-6">Iniciar sesión</h1>
      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm mb-4">
          <XCircle className="w-4 h-4" /> {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 text-green-600 text-sm mb-4">
          <CheckCircle className="w-4 h-4" /> Inicio de sesión exitoso
        </div>
      )}
      <div className="space-y-4">
        <input type="email" placeholder="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 border border-border rounded-lg bg-card" />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 border border-border rounded-lg bg-card" />
        <Button onClick={handleLogin} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 font-medium">Ingresar</Button>
        <p className="text-center text-sm text-muted-foreground">
          ¿No tienes cuenta? <Link href="/customer/register" className="text-accent hover:underline">Regístrate aquí</Link>
        </p>
        <p className="text-center text-sm text-muted-foreground">
          <Link href="/customer/forgot-password" className="text-accent hover:underline">¿Olvidaste tu contraseña?</Link>
        </p>
      </div>
    </div>
  )
}
