'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/context/LanguageContext'
import { categories as defaultCategories } from '@/lib/data/dummy-data'
import { products as defaultProducts, Product } from '@/lib/data/products'
import {
    getStoredCategories,
    setStoredCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    generateCategoryId,
    Category,
    getStoredProducts,
    setStoredProducts
} from '@/lib/utils/storage'
import Modal from '@/components/shared/Modal'

const categoryIcons = ['🌾', '🥛', '🍿', '🧴', '🧹', '🥤', '🍎', '🥖', '🍖', '🧊', '🍵', '🧃']

export default function AdminCategoriesPage() {
    const { language, t } = useLanguage()
    const [categories, setCategories] = useState<Category[]>([])
    const [products, setProducts] = useState<Product[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState<Category | null>(null)
    const [formData, setFormData] = useState<Partial<Category>>({
        nameEn: '',
        nameHi: '',
        icon: '🌾'
    })

    useEffect(() => {
        loadCategories()
        loadProducts()
    }, [])

    const loadCategories = () => {
        let storedCategories = getStoredCategories()
        if (storedCategories.length === 0) {
            // Initialize with default categories (excluding 'all')
            const initialCategories = defaultCategories.slice(1).map(cat => ({
                id: cat.id,
                nameEn: cat.nameEn,
                nameHi: cat.nameHi,
                icon: getCategoryIcon(cat.id)
            }))
            setStoredCategories(initialCategories)
            storedCategories = initialCategories
        }
        setCategories(storedCategories)
    }

    const loadProducts = () => {
        let storedProducts = getStoredProducts()
        if (storedProducts.length === 0) {
            setStoredProducts(defaultProducts)
            storedProducts = defaultProducts
        }
        setProducts(storedProducts)
    }

    const getCategoryIcon = (categoryId: string): string => {
        const iconMap: { [key: string]: string } = {
            'groceries': '🌾',
            'dairy': '🥛',
            'snacks': '🍿',
            'personalCare': '🧴',
            'household': '🧹',
            'beverages': '🥤'
        }
        return iconMap[categoryId] || '📁'
    }

    const getCategoryProductCount = (categoryId: string) => {
        return products.filter(p => p.category === categoryId).length
    }

    const handleOpenModal = (category?: Category) => {
        if (category) {
            setEditingCategory(category)
            setFormData(category)
        } else {
            setEditingCategory(null)
            setFormData({
                nameEn: '',
                nameHi: '',
                icon: '🌾'
            })
        }
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setEditingCategory(null)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (editingCategory) {
            // Update existing category
            updateCategory(editingCategory.id, formData)
        } else {
            // Add new category
            const newCategory: Category = {
                id: generateCategoryId(),
                nameEn: formData.nameEn!,
                nameHi: formData.nameHi!,
                icon: formData.icon || '📁'
            }
            addCategory(newCategory)
        }

        loadCategories()
        handleCloseModal()
    }

    const handleDelete = (categoryId: string) => {
        const productCount = getCategoryProductCount(categoryId)

        if (productCount > 0) {
            alert(language === 'hi'
                ? `इस श्रेणी में ${productCount} उत्पाद हैं। कृपया पहले उन्हें हटाएं या दूसरी श्रेणी में ले जाएं।`
                : `This category has ${productCount} products. Please remove or move them to another category first.`)
            return
        }

        if (confirm(language === 'hi' ? 'क्या आप वाकई इस श्रेणी को हटाना चाहते हैं?' : 'Are you sure you want to delete this category?')) {
            deleteCategory(categoryId)
            loadCategories()
        }
    }

    return (
        <div>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{t.admin.categories}</h2>
                    <p className="text-gray-600">
                        {categories.length} {language === 'hi' ? 'श्रेणियाँ' : 'categories'}
                    </p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all active:scale-95"
                >
                    + {t.admin.addNew}
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {categories.map((category) => {
                    const productCount = getCategoryProductCount(category.id)
                    return (
                        <div key={category.id} className="bg-white rounded-xl shadow-soft p-4 sm:p-6 hover:shadow-lg transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div className="text-3xl sm:text-4xl">
                                    {category.icon || '📁'}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleOpenModal(category)}
                                        className="text-primary-600 hover:text-primary-700 p-1"
                                        title={t.admin.edit}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(category.id)}
                                        className="text-red-600 hover:text-red-700 p-1"
                                        title={t.admin.delete}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-2">
                                {language === 'hi' ? category.nameHi : category.nameEn}
                            </h3>
                            <p className="text-gray-600 text-sm sm:text-base">
                                {productCount} {language === 'hi' ? 'उत्पाद' : 'products'}
                            </p>
                        </div>
                    )
                })}
            </div>

            {/* Add/Edit Category Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingCategory ? (language === 'hi' ? 'श्रेणी संपादित करें' : 'Edit Category') : (language === 'hi' ? 'नई श्रेणी जोड़ें' : 'Add New Category')}
                size="md"
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
                                placeholder="Groceries"
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
                                placeholder="किराना"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 mb-2 text-sm">
                            {language === 'hi' ? 'आइकन चुनें' : 'Select Icon'}
                        </label>
                        <div className="grid grid-cols-6 gap-2">
                            {categoryIcons.map((icon) => (
                                <button
                                    key={icon}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, icon })}
                                    className={`text-3xl p-3 rounded-lg border-2 transition-all hover:scale-110 ${formData.icon === icon
                                            ? 'border-primary-500 bg-primary-50'
                                            : 'border-gray-300 hover:border-primary-300'
                                        }`}
                                >
                                    {icon}
                                </button>
                            ))}
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
                            {editingCategory ? (language === 'hi' ? 'अपडेट करें' : 'Update') : (language === 'hi' ? 'जोड़ें' : 'Add')}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
