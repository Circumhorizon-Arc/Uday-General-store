'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/context/LanguageContext'
import Navbar from '@/components/customer/Navbar'
import Footer from '@/components/customer/Footer'
import { getCart, updateCartItemQuantity, removeFromCart, clearCart } from '@/lib/utils/storage'
import { getProductById } from '@/lib/utils/data-helpers'

export default function CartPage() {
    const { language, t } = useLanguage()
    const router = useRouter()
    const [cartItems, setCartItems] = useState<any[]>([])
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        loadCart()

        const handleCartUpdate = () => loadCart()
        window.addEventListener('cartUpdated', handleCartUpdate)
        return () => window.removeEventListener('cartUpdated', handleCartUpdate)
    }, [])

    const loadCart = () => {
        const cart = getCart()
        const items = cart.map(item => {
            const product = getProductById(item.productId)
            return product ? { ...item, product } : null
        }).filter(Boolean)
        setCartItems(items)
    }

    const handleUpdateQuantity = (productId: string, newQuantity: number) => {
        updateCartItemQuantity(productId, newQuantity)
        loadCart()
        window.dispatchEvent(new Event('cartUpdated'))
    }

    const handleRemove = (productId: string) => {
        removeFromCart(productId)
        loadCart()
        window.dispatchEvent(new Event('cartUpdated'))
    }

    const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    const deliveryCharge = subtotal >= 500 ? 0 : 30
    const total = subtotal + deliveryCharge

    if (!isClient) {
        return null
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                        <div className="text-8xl mb-4">🛒</div>
                        <h2 className="text-3xl font-bold mb-4">{t.cart.empty}</h2>
                        <Link
                            href="/shop"
                            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all"
                        >
                            {t.cart.continueShopping}
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
                    <h1 className="font-heading font-bold text-4xl mb-8">{t.cart.title}</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => {
                                const productName = language === 'hi' ? item.product.nameHi : item.product.nameEn
                                return (
                                    <div key={item.productId} className="bg-white rounded-xl shadow-soft p-6">
                                        <div className="flex gap-4">
                                            {/* Product Image */}
                                            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <div className="text-4xl">🛒</div>
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-grow">
                                                <Link href={`/product/${item.productId}`}>
                                                    <h3 className="font-semibold text-lg hover:text-primary-600 transition-colors">
                                                        {productName}
                                                    </h3>
                                                </Link>
                                                <p className="text-sm text-gray-600">{item.product.brand} • {item.product.weight}</p>
                                                <p className="text-xl font-bold text-primary-600 mt-2">₹{item.product.price}</p>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex flex-col items-end gap-4">
                                                <button
                                                    onClick={() => handleRemove(item.productId)}
                                                    className="text-red-600 hover:text-red-700 font-medium text-sm"
                                                >
                                                    {t.cart.remove}
                                                </button>

                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                                                        className="w-8 h-8 rounded-lg border-2 border-gray-300 hover:border-primary-500 flex items-center justify-center font-bold"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="text-lg font-bold w-8 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                                                        disabled={item.quantity >= item.product.stock}
                                                        className="w-8 h-8 rounded-lg border-2 border-gray-300 hover:border-primary-500 flex items-center justify-center font-bold disabled:opacity-50"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-soft p-6 sticky top-24">
                                <h2 className="font-heading font-bold text-2xl mb-6">{t.checkout.orderSummary}</h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-700">
                                        <span>{t.cart.subtotal}</span>
                                        <span className="font-semibold">₹{subtotal}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-700">
                                        <span>{t.cart.deliveryCharge}</span>
                                        <span className="font-semibold">{deliveryCharge === 0 ? t.common.rupee + '0 (Free)' : '₹' + deliveryCharge}</span>
                                    </div>
                                    {deliveryCharge > 0 && (
                                        <p className="text-xs text-gray-500">
                                            {language === 'hi'
                                                ? '₹500 से अधिक के ऑर्डर पर मुफ्त डिलीवरी'
                                                : 'Free delivery on orders above ₹500'}
                                        </p>
                                    )}
                                    <div className="border-t-2 border-gray-200 pt-3 flex justify-between text-lg font-bold">
                                        <span>{t.cart.total}</span>
                                        <span className="text-primary-600">₹{total}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => router.push('/checkout')}
                                    className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-primary-700 transition-all active:scale-95 mb-3"
                                >
                                    {t.cart.proceedToCheckout}
                                </button>

                                <Link
                                    href="/shop"
                                    className="block text-center text-primary-600 hover:text-primary-700 font-medium"
                                >
                                    {t.cart.continueShopping}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
