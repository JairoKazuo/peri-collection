"use client"

import Link from "next/link"
import { ShoppingCart, Search, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function CustomerHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/customer" className="text-2xl font-bold text-foreground tracking-wider">
            PERI
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 mx-8">
            <div className="w-full flex items-center bg-secondary rounded-full px-4 py-2">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full bg-transparent px-3 py-1 outline-none text-foreground placeholder:text-muted-foreground text-sm"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/customer/login">
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="w-5 h-5" />
                <span className="text-sm">Mi Cuenta</span>
              </Button>
            </Link>
            <Link href="/customer/cart">
              <Button variant="ghost" size="sm" className="gap-2">
                <ShoppingCart className="w-5 h-5" />
                <span className="text-sm">Carrito</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 pb-4 border-t border-border pt-4">
            <div className="flex items-center bg-secondary rounded-full px-4 py-2 mb-4">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full bg-transparent px-3 py-1 outline-none text-foreground placeholder:text-muted-foreground text-sm"
              />
            </div>
            <Link href="/customer/catalog" className="block">
              <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                Catálogo
              </Button>
            </Link>
            <Link href="/customer/account" className="block">
              <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                <User className="w-5 h-5" />
                Mi Cuenta
              </Button>
            </Link>
            <Link href="/customer/cart" className="block">
              <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                <ShoppingCart className="w-5 h-5" />
                Carrito
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
