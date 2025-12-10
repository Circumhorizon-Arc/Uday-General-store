'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/lib/context/LanguageContext'
import Navbar from '@/components/customer/Navbar'
import Footer from '@/components/customer/Footer'
import ProductCard from '@/components/customer/ProductCard'
import { getActiveProducts, getActiveCategories } from '@/lib/utils/data-helpers'
import { Product } from '@/lib/data/products'
import { Category } from '@/lib/utils/storage'

export default function HomePage() {
    const { language, t } = useLanguage()
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        setProducts(getActiveProducts())
        setCategories(getActiveCategories())
    }, [])

    // Get featured products (first 8)
    const featuredProducts = products.slice(0, 8)

    // Get products by category for showcase
    const groceries = products.filter(p => p.category === 'groceries').slice(0, 4)
    const snacks = products.filter(p => p.category === 'snacks').slice(0, 4)
    const dairy = products.filter(p => p.category === 'dairy').slice(0, 4)

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-orange-600 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="text-center">
                            <h1 className="font-heading font-bold text-4xl md:text-6xl mb-4">
                                {t.hero.storeName}
                            </h1>
                            <p className="text-xl md:text-2xl mb-2 font-medium">
                                {t.hero.tagline}
                            </p>
                            <p className="text-lg mb-8 text-primary-100">
                                {t.hero.serviceArea}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/shop"
                                    className="bg-white text-primary-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-primary-50 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
                                >
                                    {t.hero.shopNow}
                                </Link>
                                <Link
                                    href="/shop"
                                    className="bg-primary-700 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-primary-800 transition-all duration-200 border-2 border-white/30 active:scale-95"
                                >
                                    {t.hero.viewProducts}
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="py-12 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="font-heading font-bold text-3xl text-center mb-8">
                            {language === 'hi' ? 'श्रेणियाँ' : 'Shop by Category'}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {categories.slice(1).map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/shop?category=${category.id}`}
                                    className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-200 group"
                                >
                                    <div className="text-4xl mb-3">
                                        {category.id === 'groceries' && '🌾'}
                                        {category.id === 'dairy' && '🥛'}
                                        {category.id === 'snacks' && '🍿'}
                                        {category.id === 'personalCare' && '🧴'}
                                        {category.id === 'household' && '🧹'}
                                        {category.id === 'beverages' && '🥤'}
                                    </div>
                                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                                        {language === 'hi' ? category.nameHi : category.nameEn}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Products */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                                {language === 'hi' ? 'विशेष उत्पाद' : 'Featured Products'}
                            </h2>
                            <p className="text-gray-600 text-lg">
                                {language === 'hi' ? 'हमारे सबसे लोकप्रिय उत्पाद' : 'Our most popular products'}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            <Link
                                href="/shop"
                                className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all duration-200 active:scale-95"
                            >
                                {language === 'hi' ? 'सभी उत्पाद देखें' : 'View All Products'}
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Groceries Section */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="font-heading font-bold text-3xl mb-8">
                            {language === 'hi' ? '🌾 किराना' : '🌾 Groceries'}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {groceries.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Snacks Section */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="font-heading font-bold text-3xl mb-8">
                            {language === 'hi' ? '🍿 स्नैक्स और पेय' : '🍿 Snacks & Beverages'}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {snacks.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Dairy Section */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="font-heading font-bold text-3xl mb-8">
                            {language === 'hi' ? '🥛 डेयरी उत्पाद' : '🥛 Dairy Products'}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {dairy.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Banner */}
                <section className="py-16 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                            {language === 'hi' ? 'आज ही ऑर्डर करें!' : 'Order Today!'}
                        </h2>
                        <p className="text-xl mb-8">
                            {language === 'hi'
                                ? 'ताज़ा उत्पाद, तेज़ डिलीवरी, भरोसेमंद सेवा'
                                : 'Fresh Products, Fast Delivery, Trusted Service'}
                        </p>
                        <Link
                            href="/shop"
                            className="inline-block bg-white text-secondary-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg active:scale-95"
                        >
                            {t.hero.shopNow}
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
