"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function InventoryPage() {
  const [inventory] = useState([
    { id: 1, product: "Blazer Clásico", sku: "BLZ-001", current: 45, minimum: 20, status: "normal" },
    { id: 2, product: "Vestido de Seda", sku: "DRS-001", current: 8, minimum: 15, status: "low" },
    { id: 3, product: "Jeans Premium", sku: "JNS-001", current: 0, minimum: 10, status: "out" },
    { id: 4, product: "Camisa Blanca", sku: "CMS-001", current: 32, minimum: 20, status: "normal" },
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gestión de Inventario</h1>
        <p className="text-muted-foreground mt-2">Monitorea y ajusta los niveles de stock</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Stock Normal</p>
          <p className="text-3xl font-bold text-foreground">2</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Stock Bajo</p>
          <p className="text-3xl font-bold text-yellow-600">1</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Agotado</p>
          <p className="text-3xl font-bold text-red-600">1</p>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Producto</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">SKU</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Stock Actual</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Stock Mínimo</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Estado</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-6 py-4 text-foreground">{item.product}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.sku}</td>
                  <td className="px-6 py-4 font-semibold text-foreground">{item.current}</td>
                  <td className="px-6 py-4 text-foreground">{item.minimum}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {item.status === "low" && <AlertCircle className="w-4 h-4 text-yellow-600" />}
                      {item.status === "out" && <AlertCircle className="w-4 h-4 text-red-600" />}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === "normal"
                            ? "bg-green-100 text-green-800"
                            : item.status === "low"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.status === "normal" ? "Normal" : item.status === "low" ? "Bajo" : "Agotado"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm">
                      Ajustar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
