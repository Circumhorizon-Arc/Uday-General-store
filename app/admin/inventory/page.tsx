'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/context/LanguageContext'
import { products as defaultProducts, Product } from '@/lib/data/products'
import { getStoredProducts, setStoredProducts, updateProductStock } from '@/lib/utils/storage'
import Modal from '@/components/shared/Modal'

export default function AdminInventoryPage() {
    const { language, t } = useLanguage()
    const [products, setProducts] = useState<Product[]>([])
    const [sortBy, setSortBy] = useState<'stock' | 'name'>('stock')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [newStock, setNewStock] = useState(0)

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = () => {
        let storedProducts = getStoredProducts()
        if (storedProducts.length === 0) {
            setStoredProducts(defaultProducts)
            storedProducts = defaultProducts
        }
        setProducts(storedProducts)
    }

    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === 'stock') {
            return a.stock - b.stock
        }
        return a.nameEn.localeCompare(b.nameEn)
    })

    const outOfStock = products.filter(p => p.stock === 0)
    const lowStock = products.filter(p => p.stock > 0 && p.stock <= 10)

    const handleOpenStockModal = (product: Product) => {
        setSelectedProduct(product)
        setNewStock(product.stock)
        setIsModalOpen(true)
    }

    const handleUpdateStock = (e: React.FormEvent) => {
        e.preventDefault()
        if (selectedProduct) {
            updateProductStock(selectedProduct.id, newStock)
            loadProducts()
            setIsModalOpen(false)
        }
    }

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{t.admin.inventory}</h2>
                <p className="text-gray-600">
                    {language === 'hi' ? 'स्टॉक स्तर की निगरानी करें' : 'Monitor stock levels'}
                </p>
            </div>

            {/* Alert Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl sm:text-3xl">🚫</span>
                        <h3 className="font-bold text-red-900 text-lg sm:text-xl">{outOfStock.length}</h3>
                    </div>
                    <p className="text-red-700 font-semibold text-sm sm:text-base">
                        {language === 'hi' ? 'स्टॉक में नहीं' : 'Out of Stock'}
                    </p>
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl sm:text-3xl">⚠️</span>
                        <h3 className="font-bold text-yellow-900 text-lg sm:text-xl">{lowStock.length}</h3>
                    </div>
                    <p className="text-yellow-700 font-semibold text-sm sm:text-base">
                        {language === 'hi' ? 'कम स्टॉक (≤10)' : 'Low Stock (≤10)'}
                    </p>
                </div>
            </div>

            {/* Sort Options */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <span className="font-semibold text-gray-700 text-sm sm:text-base">
                    {language === 'hi' ? 'क्रमबद्ध करें:' : 'Sort by:'}
                </span>
                <div className="flex gap-2">
                    <button
                        onClick={() => setSortBy('stock')}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${sortBy === 'stock'
                                ? 'bg-primary-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                            }`}
                    >
                        {language === 'hi' ? 'स्टॉक स्तर' : 'Stock Level'}
                    </button>
                    <button
                        onClick={() => setSortBy('name')}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${sortBy === 'name'
                                ? 'bg-primary-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                            }`}
                    >
                        {language === 'hi' ? 'नाम' : 'Name'}
                    </button>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-xl shadow-soft overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                    {language === 'hi' ? 'उत्पाद' : 'Product'}
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase hidden md:table-cell">
                                    {language === 'hi' ? 'ब्रांड' : 'Brand'}
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase hidden sm:table-cell">
                                    {language === 'hi' ? 'कीमत' : 'Price'}
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                    {language === 'hi' ? 'स्टॉक' : 'Stock'}
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                    {language === 'hi' ? 'स्थिति' : 'Status'}
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                    {language === 'hi' ? 'कार्रवाई' : 'Action'}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {sortedProducts.map((product) => {
                                const productName = language === 'hi' ? product.nameHi : product.nameEn
                                const isOutOfStock = product.stock === 0
                                const isLowStock = product.stock > 0 && product.stock <= 10

                                return (
                                    <tr key={product.id} className={`hover:bg-gray-50 ${isOutOfStock ? 'bg-red-50' : isLowStock ? 'bg-yellow-50' : ''}`}>
                                        <td className="px-4 sm:px-6 py-4">
                                            <div className="font-semibold text-gray-900 text-sm sm:text-base">{productName}</div>
                                            <div className="text-xs sm:text-sm text-gray-600">{product.weight}</div>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 text-sm text-gray-700 hidden md:table-cell">
                                            {product.brand}
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 text-sm font-semibold text-gray-900 hidden sm:table-cell">
                                            ₹{product.price}
                                        </td>
                                        <td className="px-4 sm:px-6 py-4">
                                            <span className={`text-xl sm:text-2xl font-bold ${isOutOfStock ? 'text-red-600' : isLowStock ? 'text-yellow-600' : 'text-green-600'
                                                }`}>
                                                {product.stock}
                                            </span>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4">
                                            {isOutOfStock ? (
                                                <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                                                    {t.product.outOfStock}
                                                </span>
                                            ) : isLowStock ? (
                                                <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                                                    {t.product.lowStock}
                                                </span>
                                            ) : (
                                                <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                                    {t.product.inStock}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 sm:px-6 py-4">
                                            <button
                                                onClick={() => handleOpenStockModal(product)}
                                                className="text-primary-600 hover:text-primary-700 font-semibold text-xs sm:text-sm"
                                            >
                                                {language === 'hi' ? 'अपडेट' : 'Update'}
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Update Stock Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={language === 'hi' ? 'स्टॉक अपडेट करें' : 'Update Stock'}
                size="sm"
            >
                {selectedProduct && (
                    <form onSubmit={handleUpdateStock} className="space-y-4">
                        <div>
                            <p className="font-semibold text-gray-900 mb-1">
                                {language === 'hi' ? selectedProduct.nameHi : selectedProduct.nameEn}
                            </p>
                            <p className="text-sm text-gray-600">{selectedProduct.brand} • {selectedProduct.weight}</p>
                        </div>

                        <div>
                            <label className="block font-semibold text-gray-700 mb-2">
                                {language === 'hi' ? 'वर्तमान स्टॉक:' : 'Current Stock:'} <span className="text-primary-600">{selectedProduct.stock}</span>
                            </label>
                            <label className="block font-semibold text-gray-700 mb-2">
                                {language === 'hi' ? 'नया स्टॉक' : 'New Stock'}
                            </label>
                            <input
                                type="number"
                                required
                                min="0"
                                value={newStock}
                                onChange={(e) => setNewStock(Number(e.target.value))}
                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-2 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
                            >
                                {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-all"
                            >
                                {language === 'hi' ? 'अपडेट करें' : 'Update'}
                            </button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    )
}
