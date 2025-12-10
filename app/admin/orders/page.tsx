'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/context/LanguageContext'
import { getOrders, updateOrderStatus } from '@/lib/utils/storage'
import { getProductById } from '@/lib/utils/data-helpers'

export default function AdminOrdersPage() {
    const { language, t } = useLanguage()
    const [orders, setOrders] = useState<any[]>([])
    const [filterStatus, setFilterStatus] = useState('all')
    const [selectedOrder, setSelectedOrder] = useState<any>(null)

    useEffect(() => {
        loadOrders()
    }, [])

    const loadOrders = () => {
        const allOrders = getOrders()
        setOrders(allOrders)
    }

    const filteredOrders = filterStatus === 'all'
        ? orders
        : orders.filter(o => o.status === filterStatus)

    const handleStatusUpdate = (orderId: string, newStatus: any) => {
        updateOrderStatus(orderId, newStatus)
        loadOrders()
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered': return 'bg-green-100 text-green-700'
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

    const statuses = [
        { value: 'all', label: language === 'hi' ? 'सभी' : 'All' },
        { value: 'placed', label: t.orders.placed },
        { value: 'packed', label: t.orders.packed },
        { value: 'outForDelivery', label: t.orders.outForDelivery },
        { value: 'delivered', label: t.orders.delivered },
        { value: 'cancelled', label: t.orders.cancelled },
    ]

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.admin.orders}</h2>
                <p className="text-gray-600">
                    {filteredOrders.length} {language === 'hi' ? 'ऑर्डर' : 'orders'}
                </p>
            </div>

            {/* Filter Tabs */}
            <div className="mb-6 flex flex-wrap gap-2">
                {statuses.map((status) => (
                    <button
                        key={status.value}
                        onClick={() => setFilterStatus(status.value)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${filterStatus === status.value
                            ? 'bg-primary-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                            }`}
                    >
                        {status.label}
                    </button>
                ))}
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {filteredOrders.map((order) => (
                    <div key={order.id} className="bg-white rounded-xl shadow-soft overflow-hidden">
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                                <div>
                                    <h3 className="font-bold text-lg">
                                        {t.orders.orderNumber}{order.id}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {new Date(order.date).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN')}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                        className={`px-4 py-2 rounded-lg font-semibold border-2 ${getStatusColor(order.status)}`}
                                    >
                                        <option value="placed">{t.orders.placed}</option>
                                        <option value="packed">{t.orders.packed}</option>
                                        <option value="outForDelivery">{t.orders.outForDelivery}</option>
                                        <option value="delivered">{t.orders.delivered}</option>
                                        <option value="cancelled">{t.orders.cancelled}</option>
                                    </select>
                                    <span className="text-xl font-bold text-primary-600">₹{order.total}</span>
                                </div>
                            </div>

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
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {filteredOrders.length === 0 && (
                    <div className="bg-white rounded-xl shadow-soft p-12 text-center">
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {language === 'hi' ? 'कोई ऑर्डर नहीं' : 'No orders found'}
                        </h3>
                        <p className="text-gray-600">
                            {language === 'hi' ? 'इस स्थिति के लिए कोई ऑर्डर नहीं' : 'No orders for this status'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
