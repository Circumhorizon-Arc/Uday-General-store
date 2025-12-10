'use client'

import { use, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/context/LanguageContext'
import Navbar from '@/components/customer/Navbar'
import Footer from '@/components/customer/Footer'
import ProductCard from '@/components/customer/ProductCard'
import { getActiveProducts } from '@/lib/utils/data-helpers'
import { Product } from '@/lib/data/products'
import { addToCart } from '@/lib/utils/storage'

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params)
    const { language, t } = useLanguage()
    const router = useRouter()
    const [quantity, setQuantity] = useState(1)
    const [adding, setAdding] = useState(false)
    const [products, setProducts] = useState<Product[]>([])
    const [product, setProduct] = useState<Product | null>(null)

    useEffect(() => {
        const allProducts = getActiveProducts()
        setProducts(allProducts)
        const foundProduct = allProducts.find(p => p.id === resolvedParams.id)
        setProduct(foundProduct || null)
    }, [resolvedParams.id])

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">
                            {language === 'hi' ? 'उत्पाद नहीं मिला' : 'Product Not Found'}
                        </h1>
                        <Link href="/shop" className="text-primary-600 hover:underline">
                            {language === 'hi' ? 'दुकान पर वापस जाएं' : 'Back to Shop'}
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    const productName = language === 'hi' ? product.nameHi : product.nameEn
    const productDescription = language === 'hi' ? product.descriptionHi : product.descriptionEn
    const isOutOfStock = product.stock === 0

    // Get related products from same category
    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4)

    const handleAddToCart = () => {
        if (isOutOfStock) return

        setAdding(true)
        addToCart(product.id, quantity)
        window.dispatchEvent(new Event('cartUpdated'))

        setTimeout(() => {
            setAdding(false)
            router.push('/cart')
        }, 500)
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Breadcrumb */}
                    <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
                        <Link href="/" className="hover:text-primary-600">{t.nav.home}</Link>
                        <span>/</span>
                        <Link href="/shop" className="hover:text-primary-600">{t.nav.shop}</Link>
                        <span>/</span>
                        <span className="text-gray-900">{productName}</span>
                    </div>

                    {/* Product Details */}
                    <div className="bg-white rounded-xl shadow-soft overflow-hidden mb-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                            {/* Product Image */}
                            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                {product.image && (product.image.startsWith('data:') || product.image.startsWith('http')) ? (
                                    <img
                                        src={product.image}
                                        alt={productName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-9xl">🛒</div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div>
                                <h1 className="font-heading font-bold text-3xl md:text-4xl mb-2">
                                    {productName}
                                </h1>
                                <p className="text-lg text-gray-600 mb-4">{product.brand}</p>

                                <div className="flex items-baseline gap-2 mb-6">
                                    <span className="text-4xl font-bold text-primary-600">₹{product.price}</span>
                                    <span className="text-gray-500">/ {product.weight}</span>
                                </div>

                                <div className="mb-6">
                                    <h3 className="font-semibold text-lg mb-2">{t.product.description}</h3>
                                    <p className="text-gray-700">{productDescription}</p>
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-center gap-4 mb-2">
                                        <span className="font-semibold">{t.product.brand}:</span>
                                        <span className="text-gray-700">{product.brand}</span>
                                    </div>
                                    <div className="flex items-center gap-4 mb-2">
                                        <span className="font-semibold">{t.product.weight}:</span>
                                        <span className="text-gray-700">{product.weight}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-semibold">{t.product.inStock}:</span>
                                        <span className={`font-bold ${product.stock > 10 ? 'text-secondary-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                                            {product.stock} {language === 'hi' ? 'यूनिट' : 'units'}
                                        </span>
                                    </div>
                                </div>

                                {/* Quantity Selector */}
                                <div className="mb-6">
                                    <label className="font-semibold block mb-2">{t.product.quantity}</label>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-primary-500 flex items-center justify-center font-bold text-xl"
                                        >
                                            −
                                        </button>
                                        <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                            disabled={quantity >= product.stock}
                                            className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-primary-500 flex items-center justify-center font-bold text-xl disabled:opacity-50"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isOutOfStock || adding}
                                    className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-200 ${isOutOfStock
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
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div>
                            <h2 className="font-heading font-bold text-3xl mb-6">
                                {t.product.relatedProducts}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedProducts.map((relatedProduct) => (
                                    <ProductCard key={relatedProduct.id} product={relatedProduct} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}
