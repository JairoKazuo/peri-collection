"use client"

import Image from "next/image"
import { useFetchClientsInfo } from "@/hooks/useFetchClients"
import { Loader2, Plus, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useApiClient } from "@/lib/api/useApiClient"
import { useMemo } from "react"
import { makeClientService } from "@/clients/services/client.service"
import { useState } from "react"

import Modal from "./modal"
import Visa from "@/assets/visa.svg"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


function convertirExpiracionAISO(expirationString: string) {

    const partes = expirationString.split('/');
    if (partes.length !== 2) {
        return null;
    }
    let mes = partes[0].trim();
    let anioCorta = partes[1].trim();
    if (mes.length !== 2 || anioCorta.length !== 2) {
        return null;
    }
    const month = parseInt(mes, 10);
    const yearShort = parseInt(anioCorta, 10);
    if (month < 1 || month > 12) {
        return null;
    }
    const yearFull = 2000 + yearShort;
    const dia = '01'; 
    const monthPadded = String(month).padStart(2, '0');
    const fechaISO = `${yearFull}-${monthPadded}-${dia}`;
    
    return fechaISO;
}

export default function PaymentMethodsPage() {
    const api = useApiClient()  
    const clientService = useMemo(() => makeClientService(api), [api])
    const { paymentMethods, isLoading, error } = useFetchClientsInfo()

    const [isMethodModalOpen, setIsMethodModalOpen] = useState(false)
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)
    const [tipo, setTipo] = useState<"C" | "D">("C")
    const [marca, setMarca] = useState<string>("")

    const [ultimos_digitos, setUltimosDigitos] = useState("")
    const [fecha_vencimiento, setFechaVencimiento] = useState("")
    const [codigo_seguridad, setCodigoSeguridad] = useState("")
    const [es_predeterminado, setEsPredeterminado] = useState(false)
    const [saving, setSaving] = useState(false)
    const [paymentMethodError, setPaymentMethodError] = useState<string | null>(null)
    const [paymentMethodToDelete, setPaymentMethodToDelete] = useState(false)

    const openMethodModal = (cardType: "C" | "D") => {
        setTipo(cardType)
        setMarca("")
        setUltimosDigitos("")
        setFechaVencimiento("")
        setCodigoSeguridad("")
        setEsPredeterminado(false)
        setPaymentMethodError(null)
        setIsMethodModalOpen(true)
    }

    enum Marcas {
        Visa = "VISA",
        Mastercard = "MASTERCARD",
        AmericanExpress = "AMERICAN EXPRESS",
        Discover = "DISCOVER",
        UnionPay = "UNION PAY",
        JCB = "JCB",
        DinersClubInternational = "DINERS CLUB INTERNATIONAL"
    }

    const handleFechaVencimientoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "")
        value = value.slice(0, 4)

        if (value.length >= 3) {
            value = `${value.slice(0, 2)}/${value.slice(2, 4)}`
        }

        setFechaVencimiento(value)
    }

    const resetForm = () => {
        setTipo("C")
        setMarca("")

        setUltimosDigitos("")
        setFechaVencimiento("")
        setCodigoSeguridad("")
        setEsPredeterminado(false)
        setPaymentMethodError(null)
    }

    const handlePaymentMethodSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!tipo.trim() || !ultimos_digitos.trim() || !fecha_vencimiento.trim() || !codigo_seguridad.trim()) {
            return
        }

        setSaving(true)
        try {
            setPaymentMethodError(null)
            const fechaISO = convertirExpiracionAISO(fecha_vencimiento)

            if (!fechaISO) {
                setPaymentMethodError("La fecha de vencimiento no es válida. Use el formato MM/AA.")
                setSaving(false)
                return
            }
            const digitsOnly = ultimos_digitos.replace(/\D/g, "")

            await clientService.insertPaymentMethod({
                tipo: tipo,
                marca: marca.trim(),
                ultimos_digitos: digitsOnly,
                fecha_vencimiento: fechaISO,
                codigo_seguridad: codigo_seguridad.trim(),
                es_predeterminado: es_predeterminado,
            })
            setIsMethodModalOpen(false)
            resetForm()
            if (typeof window !== "undefined") {
                window.location.reload()
            }
        } catch (err: any) {
            const backendMessage: string | undefined = err?.response?.data?.message
            if (backendMessage) {
                setPaymentMethodError(backendMessage)
            } else {
                setPaymentMethodError("Ocurrió un error al registrar el metodo de pago")
            }
        } finally {
            setSaving(false)
        }
    }

    if (isLoading){
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="animate-spin" />
            </div>
        )
    }

    if (error){
        return (
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground mb-2">Mis Metodos de Pago</h2>
                <div className="flex items-center justify-center h-screen">
                    <p className="text-red-500">Error al cargar las direcciones</p>
                </div>
            </div>
        )
    }

    const creditMethods = paymentMethods.filter((pm) => pm.tipo === "C")
    const debitMethods = paymentMethods.filter((pm) => pm.tipo === "D")

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground mb-2">Mis Metodos de Pago</h2>
            {paymentMethods.length === 0 ? (
                <>
                    <div className="flex items-center justify-between border-b pb-4">
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">Tus tarjetas de Credito</h3>
                        <div className="flex flex-col items-center justify-center py-10 border-1 border-gray-300 rounded-xl bg-gray-100/50 text-center">
                            <CreditCard 
                                size={96} 
                                className="text-gray-400 mb-4 opacity-75"
                            />
                            <h3 className="text-xl font-medium text-gray-600 mb-2">
                                Aún no tienes tarjetas de credito guardadas
                            </h3>
                            <Button
                                id="add-credit-card"
                                className="ml-2 cursor-pointer"
                                onClick={() => openMethodModal("C")}>
                                <Plus className="w-4 h-4 mr-1" />
                                Agregar tarjeta
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">Tus tarjetas de Debito</h3>
                        <div className="flex flex-col items-center justify-center py-10 border-1 border-gray-300 rounded-xl bg-gray-100/50 text-center">
                            <CreditCard 
                                size={96} 
                                className="text-gray-400 mb-4 opacity-75"
                            />
                            <h3 className="text-xl font-medium text-gray-600 mb-2">
                                Aún no tienes tarjetas de debito guardadas
                            </h3>
                            <Button
                                id="add-debit-card"
                                className="ml-2 cursor-pointer"
                                onClick={() => openMethodModal("D")}>
                                <Plus className="w-4 h-4 mr-1" />
                                Agregar tarjeta
                            </Button>
                        </div>
                    </div>
                
                </>

            ) : (
                <>
                    {/* Tarjetas de Crédito */}
                    <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">Tus tarjetas de Credito</h3>
                        {creditMethods.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10 border-1 border-gray-300 rounded-xl bg-gray-100/50 text-center">
                                <CreditCard 
                                    size={96} 
                                    className="text-gray-400 mb-4 opacity-75"
                                />
                                <h3 className="text-xl font-medium text-gray-600 mb-2">
                                    Aún no tienes tarjetas de credito guardadas
                                </h3>
                                <Button
                                    id="add-credit-card"
                                    className="ml-2 cursor-pointer"
                                    onClick={() => openMethodModal("C")}>
                                    <Plus className="w-4 h-4 mr-1" />
                                    Agregar tarjeta
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {creditMethods.map((paymentMethod, index) => (
                                    <div key={index} className="border border-border rounded-xl p-6 bg-card">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <h3 className="font-semibold text-foreground">**** **** **** {paymentMethod.ultimos_digitos}</h3>
                                                <p className="text-sm text-muted-foreground">{paymentMethod.fecha_vencimiento.toLocaleString("en-US",
                                                    {
                                                        month: "short",
                                                        year: "numeric"
                                                    }
                                                )}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-foreground">{paymentMethod.codigo_seguridad}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Tarjetas de Débito */}
                    <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">Tus tarjetas de Debito</h3>
                        {debitMethods.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10 border-1 border-gray-300 rounded-xl bg-gray-100/50 text-center">
                                <CreditCard 
                                    size={96} 
                                    className="text-gray-400 mb-4 opacity-75"
                                />
                                <h3 className="text-xl font-medium text-gray-600 mb-2">
                                    Aún no tienes tarjetas de debito guardadas
                                </h3>
                                <Button
                                    id="add-debit-card"
                                    className="ml-2 cursor-pointer"
                                    onClick={() => openMethodModal("D")}>
                                    <Plus className="w-4 h-4 mr-1" />
                                    Agregar tarjeta
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {debitMethods.map((paymentMethod, index) => (
                                    <div key={index} className="border border-border rounded-xl p-6 bg-card">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <h3 className="font-semibold text-foreground">**** **** **** {paymentMethod.ultimos_digitos}</h3>
                                                <p className="text-sm text-muted-foreground">{paymentMethod.fecha_vencimiento.toLocaleString("en-US",
                                                    {
                                                        month: "short",
                                                        year: "numeric"
                                                    }
                                                )}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-foreground">{paymentMethod.codigo_seguridad}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
            <Modal isOpen={isMethodModalOpen} onClose={() => { setIsMethodModalOpen(false); resetForm() }}>
                <h3 className="text-lg font-semibold mb-2">Agregar dirección</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Completa los datos requerido para la tarjeta
                </p>
                <form onSubmit={handlePaymentMethodSubmit} className="space-y-4" >
                    <div>
                        <Label className="block text-sm font-medium text-foreground mb-2">Marca</Label>
                        <div className="flex items-center gap-2 mb-2">
                            {marca === Marcas.Visa && (
                                <Image
                                    src={Visa}
                                    alt="Visa"
                                    width={32}
                                    height={20}
                                    className="w-8 h-auto mr-1"
                                />
                            )}
                        </div>

                        <Label> Numero de tarjeta</Label>
                        <Input
                            type="text"
                            value={ultimos_digitos}
                            onChange={(e) => {
                                const raw = e.target.value
                                const digitsOnly = raw.replace(/\D/g, "")

                                // Formatear en grupos de 4: 0000 0000 0000 0000
                                const groups = digitsOnly.match(/.{1,4}/g) || []
                                const formatted = groups.join(" ")
                                setUltimosDigitos(formatted)

                                const firstDigit = digitsOnly.charAt(0)
                                if (firstDigit === "4") {
                                    setMarca(Marcas.Visa)
                                } else {
                                    setMarca("")
                                }
                            }}
                            placeholder="0000 0000 0000 0000"
                        />

                    </div>
                    <div>
                        <Label className="block text-sm font-medium text-foreground mb-2">Fecha Vencimiento</Label>
                        <Input
                            type="text"
                            value={fecha_vencimiento}
                            onChange={handleFechaVencimientoChange}
                            maxLength={5}
                            placeholder="MM/AA"
                        />

                        <Label className="block text-sm font-medium text-foreground mb-2">Código de seguridad</Label>
                        <Input
                            type="text"
                            value={codigo_seguridad}
                            onChange={(e) => setCodigoSeguridad(e.target.value)}
                            maxLength={3}
                            placeholder="CVV"
                        />
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <input
                            id="esPredeterminada"
                            type="checkbox"
                            checked={es_predeterminado}
                            onChange={(e) => setEsPredeterminado(e.target.checked)}
                            className="h-4 w-4"
                        />
                        <Label htmlFor="esPredeterminada" className="text-sm text-foreground">
                            Marcar como dirección predeterminada
                        </Label>
                    </div>
                    {paymentMethodError && (
                        <p className="text-sm text-red-500 mt-1">{paymentMethodError}</p>
                    )}
                    <div className="flex justify-end mt-4">
                        <Button
                            type="button"
                            onClick={() => { setIsMethodModalOpen(false); resetForm() }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="ml-2"
                            disabled={saving}
                        >
                            {saving ? "Guardando..." : "Guardar"}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}