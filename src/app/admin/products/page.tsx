"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Edit2, Trash2, Search } from "lucide-react"

export default function ProductsPage() {
  const [showForm, setShowForm] = useState(false)
  const [products] = useState([
    { id: 1, name: "Blazer Clásico", sku: "BLZ-001", price: "S/ 299", stock: 45, category: "Blazers" },
    { id: 2, name: "Vestido de Seda", sku: "DRS-001", price: "S/ 399", stock: 12, category: "Vestidos" },
    { id: 3, name: "Jeans Premium", sku: "JNS-001", price: "S/ 199", stock: 78, category: "Pantalones" },
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Catálogo de Productos</h1>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <Plus className="w-4 h-4" />
          Agregar Producto
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Nuevo Producto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nombre del Producto</label>
              <input
                type="text"
                placeholder="Ej: Blazer Clásico"
                className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">SKU</label>
              <input
                type="text"
                placeholder="Ej: BLZ-001"
                className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Precio</label>
              <input
                type="text"
                placeholder="Ej: 299.00"
                className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Stock</label>
              <input
                type="number"
                placeholder="Ej: 50"
                className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Categoría</label>
              <select className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground">
                <option>Blazers</option>
                <option>Vestidos</option>
                <option>Pantalones</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Descripción</label>
              <textarea
                placeholder="Descripción del producto"
                className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Guardar Producto</Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Cancelar
            </Button>
          </div>
        </Card>
      )}

      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-card text-foreground"
          />
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Producto</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">SKU</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Categoría</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Precio</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Stock</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-6 py-4 text-foreground">{product.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{product.sku}</td>
                  <td className="px-6 py-4 text-foreground">{product.category}</td>
                  <td className="px-6 py-4 font-semibold text-foreground">{product.price}</td>
                  <td className="px-6 py-4 text-foreground">{product.stock}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Edit2 className="w-4 h-4" />
                      Editar
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1 text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                      Eliminar
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
