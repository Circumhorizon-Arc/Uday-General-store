import { products as defaultProducts, Product } from '@/lib/data/products'
import { categories as defaultCategories } from '@/lib/data/dummy-data'
import { getStoredProducts, setStoredProducts, getStoredCategories, setStoredCategories, Category } from '@/lib/utils/storage'

/**
 * Get products from localStorage if available, otherwise return and initialize with defaults
 */
export function getActiveProducts(): Product[] {
    if (typeof window === 'undefined') return defaultProducts

    let storedProducts = getStoredProducts()
    if (storedProducts.length === 0) {
        setStoredProducts(defaultProducts)
        storedProducts = defaultProducts
    }
    return storedProducts
}

/**
 * Get a single product by ID from localStorage
 */
export function getProductById(id: string): Product | undefined {
    const products = getActiveProducts()
    return products.find(p => p.id === id)
}

/**
 * Get categories from localStorage if available, otherwise return and initialize with defaults
 */
export function getActiveCategories(): Category[] {
    if (typeof window === 'undefined') {
        return defaultCategories.map(cat => ({
            id: cat.id,
            nameEn: cat.nameEn,
            nameHi: cat.nameHi
        }))
    }

    let storedCategories = getStoredCategories()
    if (storedCategories.length === 0) {
        const initialCategories = defaultCategories.map(cat => ({
            id: cat.id,
            nameEn: cat.nameEn,
            nameHi: cat.nameHi,
            icon: getCategoryIcon(cat.id)
        }))
        setStoredCategories(initialCategories)
        storedCategories = initialCategories
    }
    return storedCategories
}

function getCategoryIcon(categoryId: string): string {
    const iconMap: { [key: string]: string } = {
        'all': '📦',
        'groceries': '🌾',
        'dairy': '🥛',
        'snacks': '🍿',
        'personalCare': '🧴',
        'household': '🧹',
        'beverages': '🥤'
    }
    return iconMap[categoryId] || '📁'
}
