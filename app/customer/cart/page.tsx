"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Blazer Clásico", price: 299, quantity: 1, size: "M", color: "Negro" },
    { id: 2, name: "Vestido de Seda", price: 399, quantity: 1, size: "S", color: "Blanco" },
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 30 : 0
  const tax = subtotal * 0.18
  const total = subtotal + shipping + tax

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-foreground mb-8">Mi Carrito</h1>

      {cartItems.length === 0 ? (
        <div className="border border-border rounded-xl p-12 text-center">
          <p className="text-muted-foreground mb-6">Tu carrito está vacío</p>
          <Link href="/customer/catalog">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Continuar Comprando</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="border border-border rounded-xl p-6 flex gap-6">
                <div className="w-24 h-24 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="text-4xl">👗</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Talla: {item.size} | Color: {item.color}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 border border-border rounded hover:bg-secondary"
                      >
                        −
                      </button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 border border-border rounded hover:bg-secondary"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-semibold text-foreground">S/ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-destructive hover:text-destructive/80 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="border border-border rounded-xl p-6 h-fit sticky top-24">
            <h2 className="text-xl font-semibold text-foreground mb-6">Resumen del Pedido</h2>
            <div className="space-y-3 mb-6 pb-6 border-b border-border">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>S/ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Envío</span>
                <span>S/ {shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Impuesto (18%)</span>
                <span>S/ {tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between text-lg font-bold text-foreground mb-6">
              <span>Total</span>
              <span>S/ {total.toFixed(2)}</span>
            </div>
            <Link href="/customer/checkout">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 font-medium">
                Proceder al Pago
              </Button>
            </Link>
            <Link href="/customer/catalog">
              <Button variant="outline" className="w-full mt-3 bg-transparent">
                Continuar Comprando
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
