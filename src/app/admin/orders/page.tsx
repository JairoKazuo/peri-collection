"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function OrdersPage() {
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null)
  const [orders] = useState([
    {
      id: 1001,
      customer: "Juan Pérez",
      date: "2025-01-20",
      total: "S/ 599.00",
      status: "Entregado",
      items: [
        { name: "Blazer Clásico", qty: 1, price: "S/ 299" },
        { name: "Vestido de Seda", qty: 1, price: "S/ 300" },
      ],
    },
    {
      id: 1002,
      customer: "María García",
      date: "2025-01-19",
      total: "S/ 399.00",
      status: "En Procesamiento",
      items: [{ name: "Jeans Premium", qty: 2, price: "S/ 199" }],
    },
    {
      id: 1003,
      customer: "Carlos López",
      date: "2025-01-18",
      total: "S/ 799.00",
      status: "Enviado",
      items: [{ name: "Blazer Clásico", qty: 1, price: "S/ 299" }],
    },
  ])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Gestión de Pedidos</h1>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">ID Pedido</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Cliente</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Fecha</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Total</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Estado</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-6 py-4 font-semibold text-foreground">#{order.id}</td>
                  <td className="px-6 py-4 text-foreground">{order.customer}</td>
                  <td className="px-6 py-4 text-muted-foreground">{order.date}</td>
                  <td className="px-6 py-4 font-semibold text-foreground">{order.total}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Entregado"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Enviado"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                      className="gap-1"
                    >
                      <ChevronDown className="w-4 h-4" />
                      Ver Detalles
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {expandedOrder && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Detalles del Pedido #{expandedOrder}</h2>
          <div className="space-y-4">
            {orders
              .filter((o) => o.id === expandedOrder)
              .map((order) => (
                <div key={order.id}>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Cliente</p>
                      <p className="font-medium text-foreground">{order.customer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Estado</p>
                      <p className="font-medium text-foreground">{order.status}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-foreground mb-2">Artículos:</p>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm py-1">
                        <span>
                          {item.name} x{item.qty}
                        </span>
                        <span>{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Actualizar Estado</Button>
                    <Button variant="outline">Imprimir Etiqueta</Button>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      )}
    </div>
  )
}
