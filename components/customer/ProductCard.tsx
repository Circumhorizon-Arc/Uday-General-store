'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/context/LanguageContext'
import { Product } from '@/lib/data/products'
import { addToCart } from '@/lib/utils/storage'
import { useState } from 'react'

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const { language, t } = useLanguage()
    const [adding, setAdding] = useState(false)

    const productName = language === 'hi' ? product.nameHi : product.nameEn
    const isLowStock = product.stock > 0 && product.stock <= 10
    const isOutOfStock = product.stock === 0

    const handleAddToCart = () => {
        if (isOutOfStock) return

        setAdding(true)
        addToCart(product.id, 1)

        // Dispatch custom event to update cart count
        window.dispatchEvent(new Event('cartUpdated'))

        setTimeout(() => setAdding(false), 500)
    }

    return (
        <div className="bg-white rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 overflow-hidden group">
            <Link href={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-100">
                <div className="w-full h-full flex items-center justify-center p-4">
                    {product.image && (product.image.startsWith('data:') || product.image.startsWith('http')) ? (
                        <img
                            src={product.image}
                            alt={productName}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="text-6xl">🛒</div>
                    )}
                </div>

                {/* Stock Badge */}
                {isOutOfStock && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {t.product.outOfStock}
                    </div>
                )}
                {isLowStock && !isOutOfStock && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {t.product.lowStock}
                    </div>
                )}
            </Link>

            <div className="p-4">
                <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-primary-600 transition-colors min-h-[3rem]">
                        {productName}
                    </h3>
                </Link>

                <p className="text-sm text-gray-500 mb-2">{product.brand} • {product.weight}</p>

                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-primary-600">₹{product.price}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                        {t.product.inStock}: {product.stock}
                    </span>
                </div>

                <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock || adding}
                    className={`w-full py-2.5 rounded-lg font-semibold transition-all duration-200 ${isOutOfStock
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : adding
                            ? 'bg-secondary-500 text-white'
                            : 'bg-primary-600 text-white hover:bg-primary-700 active:scale-95'
                        }`}
                >
                    {adding ? '✓ ' + t.product.addToCart : isOutOfStock ? t.product.outOfStock : t.product.addToCart}
                </button>
            </div>
        </div>
    )
}
