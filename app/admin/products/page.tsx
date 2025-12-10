'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/context/LanguageContext'
import { products as defaultProducts, Product } from '@/lib/data/products'
import { categories } from '@/lib/data/dummy-data'
import {
    getStoredProducts,
    setStoredProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    generateProductId
} from '@/lib/utils/storage'
import Modal from '@/components/shared/Modal'

export default function AdminProductsPage() {
    const { language, t } = useLanguage()
    const [products, setProducts] = useState<Product[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [formData, setFormData] = useState<Partial<Product>>({
        nameEn: '',
        nameHi: '',
        descriptionEn: '',
        descriptionHi: '',
        price: 0,
        category: 'groceries',
        stock: 0,
        image: '',
        brand: '',
        weight: ''
    })

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = () => {
        let storedProducts = getStoredProducts()
        if (storedProducts.length === 0) {
            // Initialize with default products
            setStoredProducts(defaultProducts)
            storedProducts = defaultProducts
        }
        setProducts(storedProducts)
    }

    const handleOpenModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product)
            setFormData(product)
        } else {
            setEditingProduct(null)
            setFormData({
                nameEn: '',
                nameHi: '',
                descriptionEn: '',
                descriptionHi: '',
                price: 0,
                category: 'groceries',
                stock: 0,
                image: '/images/products/placeholder.jpg',
                brand: '',
                weight: ''
            })
        }
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setEditingProduct(null)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (editingProduct) {
            // Update existing product
            updateProduct(editingProduct.id, formData)
        } else {
            // Add new product
            const newProduct: Product = {
                id: generateProductId(),
                ...formData as Omit<Product, 'id'>
            }
            addProduct(newProduct)
        }

        loadProducts()
        handleCloseModal()
    }

    const handleDelete = (productId: string) => {
        if (confirm(language === 'hi' ? 'क्या आप वाकई इस उत्पाद को हटाना चाहते हैं?' : 'Are you sure you want to delete this product?')) {
            deleteProduct(productId)
            loadProducts()
        }
    }

    return (
        <div>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{t.admin.products}</h2>
                    <p className="text-gray-600">
                        {products.length} {language === 'hi' ? 'उत्पाद' : 'products'}
                    </p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all active:scale-95"
                >
                    + {t.admin.addNew}
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-soft overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                    {language === 'hi' ? 'उत्पाद' : 'Product'}
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase hidden md:table-cell">
                                    {language === 'hi' ? 'श्रेणी' : 'Category'}
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                    {language === 'hi' ? 'कीमत' : 'Price'}
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                    {language === 'hi' ? 'स्टॉक' : 'Stock'}
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                    {t.admin.actions}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {products.map((product) => {
                                const productName = language === 'hi' ? product.nameHi : product.nameEn
                                const category = categories.find(c => c.id === product.category)
                                const categoryName = category ? (language === 'hi' ? category.nameHi : category.nameEn) : product.category

                                return (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="px-4 sm:px-6 py-4">
                                            <div className="font-semibold text-gray-900 text-sm sm:text-base">{productName}</div>
                                            <div className="text-xs sm:text-sm text-gray-600">{product.brand} • {product.weight}</div>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 text-sm text-gray-700 hidden md:table-cell">
                                            {categoryName}
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 text-sm font-semibold text-gray-900">
                                            ₹{product.price}
                                        </td>
                                        <td className="px-4 sm:px-6 py-4">
                                            <span className={`font-bold text-sm ${product.stock === 0 ? 'text-red-600' : product.stock <= 10 ? 'text-yellow-600' : 'text-green-600'}`}>
                                                {product.stock}
                                            </span>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleOpenModal(product)}
                                                    className="text-primary-600 hover:text-primary-700 font-semibold text-xs sm:text-sm"
                                                >
                                                    {t.admin.edit}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="text-red-600 hover:text-red-700 font-semibold text-xs sm:text-sm"
                                                >
                                                    {t.admin.delete}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Product Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingProduct ? (language === 'hi' ? 'उत्पाद संपादित करें' : 'Edit Product') : (language === 'hi' ? 'नया उत्पाद जोड़ें' : 'Add New Product')}
                size="lg"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold text-gray-700 mb-2 text-sm">
                                {language === 'hi' ? 'नाम (अंग्रेज़ी)' : 'Name (English)'}
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.nameEn}
                                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 mb-2 text-sm">
                                {language === 'hi' ? 'नाम (हिंदी)' : 'Name (Hindi)'}
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.nameHi}
                                onChange={(e) => setFormData({ ...formData, nameHi: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none text-sm"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold text-gray-700 mb-2 text-sm">
                                {language === 'hi' ? 'विवरण (अंग्रेज़ी)' : 'Description (English)'}
                            </label>
                            <textarea
                                required
                                value={formData.descriptionEn}
                                onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none text-sm"
                                rows={2}
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 mb-2 text-sm">
                                {language === 'hi' ? 'विवरण (हिंदी)' : 'Description (Hindi)'}
                            </label>
                            <textarea
                                required
                                value={formData.descriptionHi}
                                onChange={(e) => setFormData({ ...formData, descriptionHi: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none text-sm"
                                rows={2}
                            />
                        </div>
                    </div>

                    {/* Image URL or Upload */}
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2 text-sm">
                            {language === 'hi' ? 'उत्पाद छवि' : 'Product Image'}
                        </label>
                        <div className="space-y-3">
                            <input
                                type="text"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder={language === 'hi' ? 'छवि URL दर्ज करें या नीचे फ़ाइल अपलोड करें' : 'Enter image URL or upload file below'}
                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none text-sm"
                            />
                            <div className="flex items-center gap-3">
                                <label className="flex-1 cursor-pointer">
                                    <div className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg border-2 border-gray-300 transition-colors">
                                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-sm font-medium text-gray-700">
                                            {language === 'hi' ? 'फ़ाइल चुनें' : 'Choose File'}
                                        </span>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            if (file) {
                                                const reader = new FileReader()
                                                reader.onloadend = () => {
                                                    setFormData({ ...formData, image: reader.result as string })
                                                }
                                                reader.readAsDataURL(file)
                                            }
                                        }}
                                        className="hidden"
                                    />
                                </label>
                                {formData.image && (
                                    <div className="w-20 h-20 rounded-lg border-2 border-gray-300 overflow-hidden bg-gray-50 flex items-center justify-center">
                                        {formData.image.startsWith('data:') || formData.image.startsWith('http') ? (
                                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-3xl">🛒</div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-gray-500">
                                {language === 'hi'
                                    ? 'छवि URL दर्ज करें या अपने कंप्यूटर से फ़ाइल अपलोड करें'
                                    : 'Enter an image URL or upload a file from your computer'}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block font-semibold text-gray-700 mb-2 text-sm">
                                {language === 'hi' ? 'कीमत (₹)' : 'Price (₹)'}
                            </label>
                            <input
                                type="number"
                                required
                                min="0"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 mb-2 text-sm">
                                {language === 'hi' ? 'स्टॉक' : 'Stock'}
                            </label>
                            <input
                                type="number"
                                required
                                min="0"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 mb-2 text-sm">
                                {language === 'hi' ? 'वजन' : 'Weight'}
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.weight}
                                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                placeholder="1 kg"
                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none text-sm"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold text-gray-700 mb-2 text-sm">
                                {language === 'hi' ? 'ब्रांड' : 'Brand'}
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.brand}
                                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 mb-2 text-sm">
                                {language === 'hi' ? 'श्रेणी' : 'Category'}
                            </label>
                            <select
                                required
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none text-sm"
                            >
                                {categories.slice(1).map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {language === 'hi' ? cat.nameHi : cat.nameEn}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className="px-6 py-2 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all text-sm"
                        >
                            {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-all text-sm"
                        >
                            {editingProduct ? (language === 'hi' ? 'अपडेट करें' : 'Update') : (language === 'hi' ? 'जोड़ें' : 'Add')}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
