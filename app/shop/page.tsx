'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLanguage } from '@/lib/context/LanguageContext'
import Navbar from '@/components/customer/Navbar'
import Footer from '@/components/customer/Footer'
import ProductCard from '@/components/customer/ProductCard'
import { getActiveProducts, getActiveCategories } from '@/lib/utils/data-helpers'
import { Product } from '@/lib/data/products'
import { Category } from '@/lib/utils/storage'

export default function ShopPage() {
    const { language, t } = useLanguage()
    const searchParams = useSearchParams()
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        // Load products and categories from localStorage
        setProducts(getActiveProducts())
        setCategories(getActiveCategories())

        const category = searchParams.get('category')
        if (category) {
            setSelectedCategory(category)
        }
    }, [searchParams])

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
        const matchesSearch = searchQuery === '' ||
            product.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.nameHi.includes(searchQuery) ||
            product.brand.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="font-heading font-bold text-4xl mb-2">
                            {t.nav.shop}
                        </h1>
                        <p className="text-gray-600">
                            {language === 'hi'
                                ? `${filteredProducts.length} उत्पाद मिले`
                                : `${filteredProducts.length} products found`}
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder={t.admin.search + '...'}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-3 pl-12 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none"
                            />
                            <svg
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-8">
                        <div className="flex flex-wrap gap-3">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${selectedCategory === category.id
                                        ? 'bg-primary-600 text-white shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                                        }`}
                                >
                                    {language === 'hi' ? category.nameHi : category.nameEn}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Products Grid */}
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                {language === 'hi' ? 'कोई उत्पाद नहीं मिला' : 'No products found'}
                            </h3>
                            <p className="text-gray-600">
                                {language === 'hi'
                                    ? 'कृपया अपनी खोज बदलें या फ़िल्टर साफ़ करें'
                                    : 'Please try a different search or clear filters'}
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}
