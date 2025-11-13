"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Filter, X } from "lucide-react"

export default function CatalogPage() {
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({
    category: [] as string[],
    color: [] as string[],
    size: [] as string[],
    price: [] as string[],
  })

  const products = [
    { id: 1, name: "Blazer Clásico", price: "S/ 299", category: "Blazers", color: "Negro", size: "M" },
    { id: 2, name: "Vestido de Seda", price: "S/ 399", category: "Vestidos", color: "Blanco", size: "S" },
    { id: 3, name: "Jeans Premium", price: "S/ 199", category: "Pantalones", color: "Azul", size: "M" },
    { id: 4, name: "Chaqueta de Cuero", price: "S/ 599", category: "Blazers", color: "Negro", size: "L" },
    { id: 5, name: "Vestido de Noche", price: "S/ 799", category: "Vestidos", color: "Dorado", size: "M" },
    { id: 6, name: "Suéter de Cachemira", price: "S/ 349", category: "Tops", color: "Beige", size: "M" },
  ]

  const toggleFilter = (type: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: prev[type as keyof typeof prev].includes(value)
        ? prev[type as keyof typeof prev].filter((v) => v !== value)
        : [...prev[type as keyof typeof prev], value],
    }))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-foreground">Catalogo</h1>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 md:hidden bg-transparent"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-4 h-4" />
          Filtros
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className={`${showFilters ? "block" : "hidden"} md:block md:col-span-1`}>
          <div className="space-y-6 p-4 border border-border rounded-xl bg-card sticky top-24">
            <div className="flex items-center justify-between md:hidden">
              <h3 className="font-semibold text-foreground">Filtros</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Categoría</h3>
              <div className="space-y-2">
                {["Vestidos", "Blazers", "Pantalones", "Tops"].map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.category.includes(cat)}
                      onChange={() => toggleFilter("category", cat)}
                      className="rounded border-border"
                    />
                    <span className="text-sm text-muted-foreground">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Color</h3>
              <div className="space-y-2">
                {["Negro", "Blanco", "Azul", "Beige", "Dorado"].map((color) => (
                  <label key={color} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.color.includes(color)}
                      onChange={() => toggleFilter("color", color)}
                      className="rounded border-border"
                    />
                    <span className="text-sm text-muted-foreground">{color}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Talla</h3>
              <div className="space-y-2">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <label key={size} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.size.includes(size)}
                      onChange={() => toggleFilter("size", size)}
                      className="rounded border-border"
                    />
                    <span className="text-sm text-muted-foreground">{size}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Rango de Precio</h3>
              <div className="space-y-2">
                {["Menos de S/ 200", "S/ 200 - S/ 500", "S/ 500 - S/ 1000", "Más de S/ 1000"].map((range) => (
                  <label key={range} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.price.includes(range)}
                      onChange={() => toggleFilter("price", range)}
                      className="rounded border-border"
                    />
                    <span className="text-sm text-muted-foreground">{range}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link key={product.id} href={`/customer/product/${product.id}`}>
                <div className="border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
                  <div className="w-full h-64 bg-secondary group-hover:bg-secondary/80 transition-colors flex items-center justify-center">
                    <div className="text-6xl">👗</div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-accent font-semibold mb-1 uppercase">{product.category}</p>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-foreground">{product.price}</span>
                      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Ver
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
