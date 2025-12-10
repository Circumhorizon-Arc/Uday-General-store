'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/lib/context/LanguageContext'
import { products } from '@/lib/data/products'
import { getOrders } from '@/lib/utils/storage'

export default function AdminDashboardPage() {
    const { language, t } = useLanguage()
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        todayRevenue: 0,
        outOfStock: 0
    })
    const [recentOrders, setRecentOrders] = useState<any[]>([])

    useEffect(() => {
        // Calculate stats
        const orders = getOrders()
        const today = new Date().toISOString().split('T')[0]
        const todayOrders = orders.filter(o => o.date === today)
        const todayRev = todayOrders.reduce((sum, o) => sum + o.total, 0)
        const outOfStockCount = products.filter(p => p.stock === 0).length

        setStats({
            totalProducts: products.length,
            totalOrders: orders.length,
            todayRevenue: todayRev,
            outOfStock: outOfStockCount
        })

        // Get recent orders (last 5)
        setRecentOrders(orders.slice(0, 5))
    }, [])

    const statCards = [
        {
            title: t.admin.totalProducts,
            value: stats.totalProducts,
            icon: '📦',
            color: 'bg-blue-50 text-blue-600',
            iconBg: 'bg-blue-100'
        },
        {
            title: t.admin.totalOrders,
            value: stats.totalOrders,
            icon: '🛒',
            color: 'bg-green-50 text-green-600',
            iconBg: 'bg-green-100'
        },
        {
            title: t.admin.todayRevenue,
            value: `₹${stats.todayRevenue}`,
            icon: '💰',
            color: 'bg-yellow-50 text-yellow-600',
            iconBg: 'bg-yellow-100'
        },
        {
            title: t.admin.outOfStock,
            value: stats.outOfStock,
            icon: '⚠️',
            color: 'bg-red-50 text-red-600',
            iconBg: 'bg-red-100'
        }
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered': return 'bg-green-100 text-green-700'
            case 'outForDelivery': return 'bg-blue-100 text-blue-700'
            case 'packed': return 'bg-yellow-100 text-yellow-700'
            case 'placed': return 'bg-orange-100 text-orange-700'
            default: return 'bg-gray-100 text-gray-700'
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'delivered': return t.orders.delivered
            case 'outForDelivery': return t.orders.outForDelivery
            case 'packed': return t.orders.packed
            case 'placed': return t.orders.placed
            default: return status
        }
    }

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {language === 'hi' ? 'डैशबोर्ड अवलोकन' : 'Dashboard Overview'}
                </h2>
                <p className="text-gray-600">
                    {language === 'hi' ? 'आपके स्टोर का सारांश' : 'Summary of your store'}
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((card, index) => (
                    <div key={index} className={`${card.color} rounded-xl p-6`}>
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${card.iconBg} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
                                {card.icon}
                            </div>
                        </div>
                        <h3 className="text-sm font-medium opacity-80 mb-1">{card.title}</h3>
                        <p className="text-3xl font-bold">{card.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-soft overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">{t.admin.recentOrders}</h3>
                    <Link
                        href="/admin/orders"
                        className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
                    >
                        {language === 'hi' ? 'सभी देखें' : 'View All'} →
                    </Link>
                </div>

                {recentOrders.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                        {t.orders.orderNumber}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                        {language === 'hi' ? 'ग्राहक' : 'Customer'}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                        {t.orders.date}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                        {t.orders.status}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                        {t.orders.total}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {order.id}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {order.customerName}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {new Date(order.date).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                                {getStatusText(order.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-primary-600">
                                            ₹{order.total}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="px-6 py-12 text-center text-gray-500">
                        {language === 'hi' ? 'कोई ऑर्डर नहीं' : 'No orders yet'}
                    </div>
                )}
            </div>

            {/* Low Stock Alert */}
            {stats.outOfStock > 0 && (
                <div className="mt-6 bg-red-50 border-2 border-red-200 rounded-xl p-6">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">⚠️</span>
                        <div>
                            <h3 className="font-bold text-red-900 text-lg">
                                {language === 'hi' ? 'स्टॉक अलर्ट!' : 'Stock Alert!'}
                            </h3>
                            <p className="text-red-700">
                                {stats.outOfStock} {language === 'hi' ? 'उत्पाद स्टॉक में नहीं हैं' : 'products are out of stock'}
                            </p>
                            <Link
                                href="/admin/inventory"
                                className="text-red-600 hover:text-red-700 font-semibold text-sm mt-2 inline-block"
                            >
                                {language === 'hi' ? 'इन्वेंटरी देखें' : 'View Inventory'} →
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
