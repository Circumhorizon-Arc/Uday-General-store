'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/context/LanguageContext'
import Navbar from '@/components/customer/Navbar'
import Footer from '@/components/customer/Footer'
import { getCart, clearCart, addOrder, generateOrderId, getUserSession } from '@/lib/utils/storage'
import { getProductById } from '@/lib/utils/data-helpers'

export default function CheckoutPage() {
    const { language, t } = useLanguage()
    const router = useRouter()
    const [cartItems, setCartItems] = useState<any[]>([])
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        address: '',
        landmark: '',
        pincode: '',
        paymentMethod: 'cod' as 'upi' | 'cod'
    })
    const [orderPlaced, setOrderPlaced] = useState(false)
    const [orderId, setOrderId] = useState('')

    useEffect(() => {
        const cart = getCart()
        if (cart.length === 0) {
            router.push('/cart')
            return
        }

        const items = cart.map(item => {
            const product = getProductById(item.productId)
            return product ? { ...item, product } : null
        }).filter(Boolean)
        setCartItems(items)

        // Pre-fill user data if logged in
        const session = getUserSession()
        if (session?.mobile) {
            setFormData(prev => ({ ...prev, mobile: session.mobile, name: session.name || '' }))
        }
    }, [router])

    const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    const deliveryCharge = subtotal >= 500 ? 0 : 30
    const total = subtotal + deliveryCharge

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const newOrderId = generateOrderId()
        const order = {
            id: newOrderId,
            customerId: formData.mobile,
            customerName: formData.name,
            customerMobile: formData.mobile,
            customerAddress: `${formData.address}, ${formData.landmark}, Delhi - ${formData.pincode}`,
            items: cartItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.product.price
            })),
            subtotal,
            deliveryCharge,
            total,
            paymentMethod: formData.paymentMethod,
            paymentStatus: (formData.paymentMethod === 'upi' ? 'paid' : 'pending') as 'paid' | 'pending',
            status: 'placed' as const,
            date: new Date().toISOString().split('T')[0]
        }

        addOrder(order)
        clearCart()
        window.dispatchEvent(new Event('cartUpdated'))
        setOrderId(newOrderId)
        setOrderPlaced(true)
    }

    if (orderPlaced) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow flex items-center justify-center bg-gray-50">
                    <div className="max-w-md w-full mx-4">
                        <div className="bg-white rounded-xl shadow-soft p-8 text-center">
                            <div className="text-6xl mb-4">✅</div>
                            <h2 className="text-3xl font-bold text-secondary-600 mb-2">
                                {t.checkout.orderSuccess}
                            </h2>
                            <p className="text-gray-600 mb-4">{t.checkout.thankYou}</p>
                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                <p className="text-sm text-gray-600 mb-1">{t.checkout.orderNumber}</p>
                                <p className="text-2xl font-bold text-gray-900">{orderId}</p>
                            </div>
                            <div className="space-y-3">
                                <button
                                    onClick={() => router.push('/orders')}
                                    className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all"
                                >
                                    {t.orders.title}
                                </button>
                                <button
                                    onClick={() => router.push('/')}
                                    className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                                >
                                    {t.nav.home}
                                </button>
                            </div>
                        </div>
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
                    <h1 className="font-heading font-bold text-4xl mb-8">{t.checkout.title}</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Checkout Form */}
                        <div className="lg:col-span-2">
                            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-soft p-6">
                                <h2 className="font-heading font-bold text-2xl mb-6">{t.checkout.deliveryDetails}</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block font-semibold mb-2">{t.checkout.name} *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-semibold mb-2">{t.checkout.mobile} *</label>
                                        <input
                                            type="tel"
                                            required
                                            pattern="[0-9+\s-]+"
                                            value={formData.mobile}
                                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                            placeholder="+91 98765 43210"
                                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-semibold mb-2">{t.checkout.address} *</label>
                                        <textarea
                                            required
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            rows={3}
                                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-semibold mb-2">{t.checkout.landmark}</label>
                                            <input
                                                type="text"
                                                value={formData.landmark}
                                                onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                                                placeholder={language === 'hi' ? 'मेट्रो स्टेशन के पास' : 'Near Metro Station'}
                                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-semibold mb-2">{t.checkout.pincode} *</label>
                                            <input
                                                type="text"
                                                required
                                                pattern="[0-9]{6}"
                                                value={formData.pincode}
                                                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                                placeholder="110085"
                                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-semibold mb-3">{t.checkout.paymentMethod} *</label>
                                        <div className="space-y-3">
                                            <label className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="cod"
                                                    checked={formData.paymentMethod === 'cod'}
                                                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as 'cod' })}
                                                    className="w-5 h-5"
                                                />
                                                <div>
                                                    <div className="font-semibold">{t.checkout.cod}</div>
                                                    <div className="text-sm text-gray-600">
                                                        {language === 'hi' ? 'डिलीवरी पर नकद भुगतान करें' : 'Pay cash on delivery'}
                                                    </div>
                                                </div>
                                            </label>

                                            <label className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="upi"
                                                    checked={formData.paymentMethod === 'upi'}
                                                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as 'upi' })}
                                                    className="w-5 h-5"
                                                />
                                                <div>
                                                    <div className="font-semibold">{t.checkout.upi}</div>
                                                    <div className="text-sm text-gray-600">
                                                        {language === 'hi' ? 'UPI से भुगतान करें (डेमो)' : 'Pay via UPI (Demo)'}
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full mt-6 bg-primary-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-primary-700 transition-all active:scale-95"
                                >
                                    {t.checkout.placeOrder}
                                </button>
                            </form>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-soft p-6 sticky top-24">
                                <h2 className="font-heading font-bold text-2xl mb-6">{t.checkout.orderSummary}</h2>

                                <div className="space-y-3 mb-4">
                                    {cartItems.map((item) => {
                                        const productName = language === 'hi' ? item.product.nameHi : item.product.nameEn
                                        return (
                                            <div key={item.productId} className="flex justify-between text-sm">
                                                <span className="text-gray-700">{productName} × {item.quantity}</span>
                                                <span className="font-semibold">₹{item.product.price * item.quantity}</span>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="border-t-2 border-gray-200 pt-4 space-y-3">
                                    <div className="flex justify-between text-gray-700">
                                        <span>{t.cart.subtotal}</span>
                                        <span className="font-semibold">₹{subtotal}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-700">
                                        <span>{t.cart.deliveryCharge}</span>
                                        <span className="font-semibold">{deliveryCharge === 0 ? 'Free' : '₹' + deliveryCharge}</span>
                                    </div>
                                    <div className="border-t-2 border-gray-200 pt-3 flex justify-between text-lg font-bold">
                                        <span>{t.cart.total}</span>
                                        <span className="text-primary-600">₹{total}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
