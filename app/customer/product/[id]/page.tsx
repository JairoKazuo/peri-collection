"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [selectedSize, setSelectedSize] = useState("M")
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const product = {
    id: params.id,
    name: "Blazer Clásico Premium",
    price: "S/ 299",
    rating: 4.8,
    reviews: 124,
    description:
      "Un blazer clásico y versátil que combina elegancia con comodidad. Perfecto para cualquier ocasión, desde la oficina hasta eventos especiales.",
    details: ["Material: 100% Algodón Premium", "Forro: Seda Natural", "Cuidado: Lavar en seco", "Origen: Perú"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Negro", "Blanco", "Azul Marino"],
  }

  const images = ["👗", "👗", "👗", "👗"]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link href="/customer/catalog" className="text-accent hover:text-accent/90 mb-6 inline-flex items-center gap-1">
        ← Volver al Catálogo
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative w-full h-96 md:h-[500px] bg-secondary rounded-xl flex items-center justify-center overflow-hidden group">
            <div className="text-8xl">{images[currentImageIndex]}</div>

            {/* Navigation Buttons */}
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-20 bg-secondary rounded-lg flex items-center justify-center text-3xl border-2 transition-all ${
                  currentImageIndex === index ? "border-accent" : "border-transparent"
                }`}
              >
                {_}
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="font-semibold text-foreground">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} reseñas)</span>
              </div>
            </div>
          </div>

          <div className="text-3xl font-bold text-foreground">{product.price}</div>

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Color Selection */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Color</h3>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className="px-4 py-2 border border-border rounded-lg hover:border-accent transition-colors text-sm"
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Talla</h3>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 border rounded-lg font-medium transition-all ${
                    selectedSize === size
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:border-accent"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Cantidad</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
              >
                −
              </button>
              <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 font-medium">
              Agregar al Carrito
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                <Heart className="w-5 h-5" />
                Favorito
              </Button>
              <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                <Share2 className="w-5 h-5" />
                Compartir
              </Button>
            </div>
          </div>

          {/* Product Details */}
          <div className="border-t border-border pt-6">
            <h3 className="font-semibold text-foreground mb-3">Detalles del Producto</h3>
            <ul className="space-y-2">
              {product.details.map((detail, index) => (
                <li key={index} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-accent">•</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          {/* Try On Button */}
          <Button variant="outline" className="w-full gap-2 py-3 bg-transparent">
            📱 Prueba Virtual (AR)
          </Button>
        </div>
      </div>
    </div>
  )
}
