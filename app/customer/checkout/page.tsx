"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function CheckoutPage() {
  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">("shipping")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNextStep = () => {
    if (step === "shipping") setStep("payment")
    else if (step === "payment") setStep("confirmation")
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-foreground mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="flex gap-4 mb-12">
        {["Envío", "Pago", "Confirmación"].map((label, index) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                index === 0 && step === "shipping"
                  ? "bg-accent text-accent-foreground"
                  : index === 1 && (step === "payment" || step === "confirmation")
                    ? "bg-accent text-accent-foreground"
                    : index === 2 && step === "confirmation"
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-muted-foreground"
              }`}
            >
              {index + 1}
            </div>
            <span className="text-sm font-medium text-foreground">{label}</span>
            {index < 2 && <div className="flex-1 h-1 bg-border mx-2"></div>}
          </div>
        ))}
      </div>

      {/* Shipping Step */}
      {step === "shipping" && (
        <div className="space-y-6">
          <div className="border border-border rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Información de Envío</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nombre Completo</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Juan Pérez"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="juan@ejemplo.com"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+51 999 999 999"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Dirección</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Calle Principal 123"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Ciudad</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Lima"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Código Postal</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="15001"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold text-foreground mb-3">Opciones de Envío</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="shipping" defaultChecked className="rounded-full" />
                  <span className="text-sm text-foreground">Envío Estándar (2-3 días) - S/ 30</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="shipping" className="rounded-full" />
                  <span className="text-sm text-foreground">Envío Express (1 día) - S/ 60</span>
                </label>
              </div>
            </div>
          </div>

          <Button
            onClick={handleNextStep}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 font-medium"
          >
            Continuar al Pago
          </Button>
        </div>
      )}

      {/* Payment Step */}
      {step === "payment" && (
        <div className="space-y-6">
          <div className="border border-border rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Información de Pago</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nombre en la Tarjeta</label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  placeholder="Juan Pérez"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Número de Tarjeta</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Fecha de Vencimiento</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setStep("shipping")} className="flex-1 py-3 font-medium">
              Atrás
            </Button>
            <Button
              onClick={handleNextStep}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 py-3 font-medium"
            >
              Confirmar Pedido
            </Button>
          </div>
        </div>
      )}

      {/* Confirmation Step */}
      {step === "confirmation" && (
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle className="w-20 h-20 text-accent" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">¡Pedido Confirmado!</h2>
            <p className="text-muted-foreground mb-4">Número de Pedido: #PER-2025-001234</p>
            <p className="text-muted-foreground">Te hemos enviado un correo de confirmación a {formData.email}</p>
          </div>
          <div className="bg-secondary rounded-xl p-6 text-left">
            <h3 className="font-semibold text-foreground mb-4">Resumen del Pedido</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Subtotal: S/ 698.00</p>
              <p>Envío: S/ 30.00</p>
              <p>Impuesto: S/ 130.64</p>
              <p className="font-semibold text-foreground border-t border-border pt-2">Total: S/ 858.64</p>
            </div>
          </div>
          <div className="space-y-3">
            <Link href="/customer/account">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 font-medium">
                Ver Mis Pedidos
              </Button>
            </Link>
            <Link href="/customer/catalog">
              <Button variant="outline" className="w-full py-3 font-medium bg-transparent">
                Continuar Comprando
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
