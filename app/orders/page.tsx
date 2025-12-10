'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/lib/context/LanguageContext'
import Navbar from '@/components/customer/Navbar'
import Footer from '@/components/customer/Footer'
import { getOrders } from '@/lib/utils/storage'
import { getProductById } from '@/lib/utils/data-helpers'

export default function OrdersPage() {
    const { language, t } = useLanguage()
    const [orders, setOrders] = useState<any[]>([])
    const [selectedOrder, setSelectedOrder] = useState<any>(null)

    useEffect(() => {
        const allOrders = getOrders()
        setOrders(allOrders)
    }, [])

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered': return 'bg-secondary-100 text-secondary-700'
            case 'outForDelivery': return 'bg-blue-100 text-blue-700'
            case 'packed': return 'bg-yellow-100 text-yellow-700'
            case 'placed': return 'bg-orange-100 text-orange-700'
            case 'cancelled': return 'bg-red-100 text-red-700'
            default: return 'bg-gray-100 text-gray-700'
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'delivered': return t.orders.delivered
            case 'outForDelivery': return t.orders.outForDelivery
            case 'packed': return t.orders.packed
            case 'placed': return t.orders.placed
            case 'cancelled': return t.orders.cancelled
            default: return status
        }
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                        <div className="text-8xl mb-4">📦</div>
                        <h2 className="text-3xl font-bold mb-4">{t.orders.noOrders}</h2>
                        <Link
                            href="/shop"
                            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all"
                        >
                            {t.hero.shopNow}
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="font-heading font-bold text-4xl mb-8">{t.orders.title}</h1>

                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-xl shadow-soft overflow-hidden">
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                                        <div>
                                            <h3 className="font-bold text-lg">
                                                {t.orders.orderNumber}{order.id}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {t.orders.date}: {new Date(order.date).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN')}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-4 py-2 rounded-full font-semibold text-sm ${getStatusColor(order.status)}`}>
                                                {getStatusText(order.status)}
                                            </span>
                                            <span className="text-xl font-bold text-primary-600">₹{order.total}</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <p className="text-sm text-gray-600 mb-1">{language === 'hi' ? 'ग्राहक' : 'Customer'}</p>
                                                <p className="font-semibold">{order.customerName}</p>
                                                <p className="text-sm text-gray-600">{order.customerMobile}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 mb-1">{language === 'hi' ? 'पता' : 'Address'}</p>
                                                <p className="text-sm">{order.customerAddress}</p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                                            className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center gap-2"
                                        >
                                            {selectedOrder?.id === order.id ? '▼' : '▶'} {t.orders.viewDetails}
                                        </button>

                                        {selectedOrder?.id === order.id && (
                                            <div className="mt-4 bg-gray-50 rounded-lg p-4">
                                                <h4 className="font-semibold mb-3">{language === 'hi' ? 'ऑर्डर आइटम' : 'Order Items'}</h4>
                                                <div className="space-y-2">
                                                    {order.items.map((item: any, index: number) => {
                                                        const product = getProductById(item.productId)
                                                        if (!product) return null
                                                        const productName = language === 'hi' ? product.nameHi : product.nameEn
                                                        return (
                                                            <div key={index} className="flex justify-between text-sm">
                                                                <span>{productName} × {item.quantity}</span>
                                                                <span className="font-semibold">₹{item.price * item.quantity}</span>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                <div className="border-t border-gray-300 mt-3 pt-3 space-y-1">
                                                    <div className="flex justify-between text-sm">
                                                        <span>{t.cart.subtotal}</span>
                                                        <span>₹{order.subtotal}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span>{t.cart.deliveryCharge}</span>
                                                        <span>₹{order.deliveryCharge}</span>
                                                    </div>
                                                    <div className="flex justify-between font-bold">
                                                        <span>{t.cart.total}</span>
                                                        <span className="text-primary-600">₹{order.total}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-3 pt-3 border-t border-gray-300">
                                                    <div className="flex justify-between text-sm">
                                                        <span>{language === 'hi' ? 'भुगतान विधि' : 'Payment Method'}</span>
                                                        <span className="font-semibold">{order.paymentMethod === 'cod' ? t.checkout.cod : t.checkout.upi}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm mt-1">
                                                        <span>{language === 'hi' ? 'भुगतान स्थिति' : 'Payment Status'}</span>
                                                        <span className={`font-semibold ${order.paymentStatus === 'paid' ? 'text-secondary-600' : 'text-yellow-600'}`}>
                                                            {order.paymentStatus === 'paid' ? (language === 'hi' ? 'भुगतान किया गया' : 'Paid') : (language === 'hi' ? 'लंबित' : 'Pending')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
