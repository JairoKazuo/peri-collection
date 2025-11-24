"use client"

const mockOrders = [
  { id: "PER-2025-001234", date: "2025-01-15", total: "S/ 858.64", status: "Entregado" },
  { id: "PER-2025-001233", date: "2025-01-10", total: "S/ 599.00", status: "En Tránsito" },
  { id: "PER-2025-001232", date: "2025-01-05", total: "S/ 399.00", status: "Entregado" },
]

export default function OrdersPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-foreground mb-2">Mis Pedidos</h2>
      {mockOrders.map((order) => (
        <div key={order.id} className="border border-border rounded-xl p-6 bg-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">{order.id}</h3>
              <p className="text-sm text-muted-foreground">{order.date}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground">{order.total}</p>
              <p
                className={`text-sm font-medium ${
                  order.status === "Entregado" ? "text-green-600" : "text-blue-600"
                }`}
              >
                {order.status}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
