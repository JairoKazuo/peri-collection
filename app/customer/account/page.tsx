"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Edit2, Package, RotateCcw, CheckCircle } from "lucide-react"

export default function AccountPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "returns">("profile")
  const [user, setUser] = useState<any>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("activeUser")
    if (!storedUser) {
      router.push("/customer/login")
    } else {
      setUser(JSON.parse(storedUser))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("activeUser")
    router.push("/customer/login")
  }

  const handleSave = () => {
    localStorage.setItem("activeUser", JSON.stringify(user))
    localStorage.setItem("userData", JSON.stringify(user))
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser((prev: any) => ({ ...prev, [name]: value }))
  }

  if (!user) return null

  const orders = [
    { id: "PER-2025-001234", date: "2025-01-15", total: "S/ 858.64", status: "Entregado" },
    { id: "PER-2025-001233", date: "2025-01-10", total: "S/ 599.00", status: "En Tránsito" },
  ]

  const returns = [
    { id: "RET-2025-001", orderId: "PER-2025-001234", reason: "Talla incorrecta", status: "Aprobado", date: "2025-01-16" },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-foreground">Mi Cuenta</h1>
        <Button variant="outline" className="gap-2 bg-transparent" onClick={handleLogout}>
          <LogOut className="w-5 h-5" />
          Cerrar Sesión
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="border border-border rounded-xl p-6 bg-card">
            <div className="mb-6">
              <div className="w-16 h-16 bg-secondary rounded-full mb-4"></div>
              <h2 className="font-semibold text-foreground">{user.firstName} {user.lastName}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <nav className="space-y-2">
              <button onClick={() => setActiveTab("profile")} className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === "profile" ? "bg-accent text-accent-foreground" : "hover:bg-secondary"}`}>
                <Edit2 className="w-4 h-4 inline mr-2" /> Perfil
              </button>
              <button onClick={() => setActiveTab("orders")} className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === "orders" ? "bg-accent text-accent-foreground" : "hover:bg-secondary"}`}>
                <Package className="w-4 h-4 inline mr-2" /> Mis Pedidos
              </button>
              <button onClick={() => setActiveTab("returns")} className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === "returns" ? "bg-accent text-accent-foreground" : "hover:bg-secondary"}`}>
                <RotateCcw className="w-4 h-4 inline mr-2" /> Devoluciones
              </button>
            </nav>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="md:col-span-3">
          {activeTab === "profile" && (
            <div className="border border-border rounded-xl p-6 bg-card">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Información Personal</h2>

              {success && (
                <div className="flex items-center gap-2 text-green-600 text-sm mb-4">
                  <CheckCircle className="w-4 h-4" /> Datos actualizados correctamente
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre</label>
                  <input name="firstName" value={user.firstName} onChange={handleChange} className="w-full px-4 py-2 border border-border rounded-lg bg-card" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Apellido</label>
                  <input name="lastName" value={user.lastName} onChange={handleChange} className="w-full px-4 py-2 border border-border rounded-lg bg-card" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Correo</label>
                  <input name="email" value={user.email} onChange={handleChange} className="w-full px-4 py-2 border border-border rounded-lg bg-card" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Teléfono</label>
                  <input name="phone" value={user.phone} onChange={handleChange} className="w-full px-4 py-2 border border-border rounded-lg bg-card" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Dirección</label>
                  <input name="address" value={user.address} onChange={handleChange} className="w-full px-4 py-2 border border-border rounded-lg bg-card" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Ciudad</label>
                  <input name="city" value={user.city} onChange={handleChange} className="w-full px-4 py-2 border border-border rounded-lg bg-card" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Código Postal</label>
                  <input name="postalCode" value={user.postalCode} onChange={handleChange} className="w-full px-4 py-2 border border-border rounded-lg bg-card" />
                </div>
              </div>

              <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">Guardar Cambios</Button>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="border border-border rounded-xl p-6 bg-card">
                  <div className="flex justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{order.id}</h3>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{order.total}</p>
                      <p className={`text-sm ${order.status === "Entregado" ? "text-green-600" : "text-blue-600"}`}>{order.status}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Ver Detalles</Button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "returns" && (
            <div className="space-y-4">
              {returns.map(ret => (
                <div key={ret.id} className="border border-border rounded-xl p-6 bg-card">
                  <div className="flex justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{ret.id}</h3>
                      <p className="text-sm text-muted-foreground">Pedido: {ret.orderId}</p>
                      <p className="text-sm text-muted-foreground">Razón: {ret.reason}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-green-600">{ret.status}</p>
                      <p className="text-sm text-muted-foreground">{ret.date}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Ver Detalles</Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

