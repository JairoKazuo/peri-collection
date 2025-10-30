"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LogOut, Edit2, Package, RotateCcw } from "lucide-react"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "returns">("profile")

  const orders = [
    { id: "PER-2025-001234", date: "2025-01-15", total: "S/ 858.64", status: "Entregado" },
    { id: "PER-2025-001233", date: "2025-01-10", total: "S/ 599.00", status: "En Tránsito" },
    { id: "PER-2025-001232", date: "2025-01-05", total: "S/ 399.00", status: "Entregado" },
  ]

  const returns = [
    {
      id: "RET-2025-001",
      orderId: "PER-2025-001234",
      reason: "Talla incorrecta",
      status: "Aprobado",
      date: "2025-01-16",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-foreground">Mi Cuenta</h1>
        <Button variant="outline" className="gap-2 bg-transparent">
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
              <h2 className="font-semibold text-foreground">Juan Pérez</h2>
              <p className="text-sm text-muted-foreground">juan@ejemplo.com</p>
            </div>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "profile" ? "bg-accent text-accent-foreground" : "hover:bg-secondary text-foreground"
                }`}
              >
                <Edit2 className="w-4 h-4 inline mr-2" />
                Perfil
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "orders" ? "bg-accent text-accent-foreground" : "hover:bg-secondary text-foreground"
                }`}
              >
                <Package className="w-4 h-4 inline mr-2" />
                Mis Pedidos
              </button>
              <button
                onClick={() => setActiveTab("returns")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "returns" ? "bg-accent text-accent-foreground" : "hover:bg-secondary text-foreground"
                }`}
              >
                <RotateCcw className="w-4 h-4 inline mr-2" />
                Devoluciones
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="border border-border rounded-xl p-6 bg-card">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Información Personal</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Nombre</label>
                  <input
                    type="text"
                    defaultValue="Juan"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Apellido</label>
                  <input
                    type="text"
                    defaultValue="Pérez"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Correo Electrónico</label>
                  <input
                    type="email"
                    defaultValue="juan@ejemplo.com"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Teléfono</label>
                  <input
                    type="tel"
                    defaultValue="+51 999 999 999"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-4 mt-8">Dirección</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Dirección</label>
                  <input
                    type="text"
                    defaultValue="Calle Principal 123"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Ciudad</label>
                  <input
                    type="text"
                    defaultValue="Lima"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Código Postal</label>
                  <input
                    type="text"
                    defaultValue="15001"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Guardar Cambios</Button>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border border-border rounded-xl p-6 bg-card">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground">{order.id}</h3>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{order.total}</p>
                      <p
                        className={`text-sm font-medium ${order.status === "Entregado" ? "text-green-600" : "text-blue-600"}`}
                      >
                        {order.status}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver Detalles
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Returns Tab */}
          {activeTab === "returns" && (
            <div className="space-y-4">
              {returns.length > 0 ? (
                returns.map((ret) => (
                  <div key={ret.id} className="border border-border rounded-xl p-6 bg-card">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-foreground">{ret.id}</h3>
                        <p className="text-sm text-muted-foreground">Pedido: {ret.orderId}</p>
                        <p className="text-sm text-muted-foreground">Razón: {ret.reason}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">{ret.status}</p>
                        <p className="text-sm text-muted-foreground">{ret.date}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver Detalles
                    </Button>
                  </div>
                ))
              ) : (
                <div className="border border-border rounded-xl p-12 text-center bg-card">
                  <p className="text-muted-foreground">No tienes devoluciones pendientes</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
