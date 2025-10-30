import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-5xl font-bold text-foreground">PERI COLLECTION</h1>
          <p className="text-xl text-muted-foreground">Luxury Fashion E-Commerce Platform</p>

          <div className="flex gap-4 justify-center pt-8">
            <Link href="/customer/catalog">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Shop Now
              </Button>
            </Link>
            <Link href="/admin/dashboard">
              <Button size="lg" variant="outline">
                Admin Portal
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-16">
            <div className="p-8 border border-border rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Customer Portal</h2>
              <ul className="space-y-2 text-left text-muted-foreground">
                <li>• Browse fashion catalog</li>
                <li>• Virtual try-on (AR)</li>
                <li>• Secure checkout</li>
                <li>• Track orders</li>
                <li>• Manage returns</li>
              </ul>
            </div>

            <div className="p-8 border border-border rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Admin Portal</h2>
              <ul className="space-y-2 text-left text-muted-foreground">
                <li>• Manage products</li>
                <li>• Inventory control</li>
                <li>• Order management</li>
                <li>• Return processing</li>
                <li>• Analytics dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
