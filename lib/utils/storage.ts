import { Product } from '@/lib/data/products'
import { Order, Customer } from '@/lib/data/dummy-data'

// Cart Management
export interface CartItem {
    productId: string
    quantity: number
}

export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return []
    const cart = localStorage.getItem('cart')
    return cart ? JSON.parse(cart) : []
}

export function addToCart(productId: string, quantity: number = 1): void {
    const cart = getCart()
    const existingItem = cart.find(item => item.productId === productId)

    if (existingItem) {
        existingItem.quantity += quantity
    } else {
        cart.push({ productId, quantity })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
}

export function updateCartItemQuantity(productId: string, quantity: number): void {
    const cart = getCart()
    const item = cart.find(item => item.productId === productId)

    if (item) {
        item.quantity = quantity
        if (item.quantity <= 0) {
            removeFromCart(productId)
        } else {
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }
}

export function removeFromCart(productId: string): void {
    const cart = getCart()
    const updatedCart = cart.filter(item => item.productId !== productId)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
}

export function clearCart(): void {
    localStorage.removeItem('cart')
}

export function getCartCount(): number {
    const cart = getCart()
    return cart.reduce((total, item) => total + item.quantity, 0)
}

// User Session Management
export interface UserSession {
    mobile: string
    name?: string
    isLoggedIn: boolean
}

export function getUserSession(): UserSession | null {
    if (typeof window === 'undefined') return null
    const session = localStorage.getItem('userSession')
    return session ? JSON.parse(session) : null
}

export function setUserSession(session: UserSession): void {
    localStorage.setItem('userSession', JSON.stringify(session))
}

export function clearUserSession(): void {
    localStorage.removeItem('userSession')
}

export function isUserLoggedIn(): boolean {
    const session = getUserSession()
    return session?.isLoggedIn || false
}

// Admin Session Management
export interface AdminSession {
    email: string
    isLoggedIn: boolean
}

export function getAdminSession(): AdminSession | null {
    if (typeof window === 'undefined') return null
    const session = localStorage.getItem('adminSession')
    return session ? JSON.parse(session) : null
}

export function setAdminSession(session: AdminSession): void {
    localStorage.setItem('adminSession', JSON.stringify(session))
}

export function clearAdminSession(): void {
    localStorage.removeItem('adminSession')
}

export function isAdminLoggedIn(): boolean {
    const session = getAdminSession()
    return session?.isLoggedIn || false
}

// Admin Login Validation
export function validateAdminCredentials(email: string, password: string): boolean {
    return email === 'admin@udaystore.in' && password === 'Admin@789'
}

// Orders Management
export function getOrders(): Order[] {
    if (typeof window === 'undefined') return []
    const orders = localStorage.getItem('orders')
    return orders ? JSON.parse(orders) : []
}

export function addOrder(order: Order): void {
    const orders = getOrders()
    orders.unshift(order) // Add to beginning
    localStorage.setItem('orders', JSON.stringify(orders))
}

export function updateOrderStatus(orderId: string, status: Order['status']): void {
    const orders = getOrders()
    const order = orders.find(o => o.id === orderId)
    if (order) {
        order.status = status
        localStorage.setItem('orders', JSON.stringify(orders))
    }
}

export function getUserOrders(mobile: string): Order[] {
    const orders = getOrders()
    return orders.filter(order => order.customerMobile === mobile)
}

// Products Management (for admin)
export function getStoredProducts(): Product[] {
    if (typeof window === 'undefined') return []
    const products = localStorage.getItem('products')
    return products ? JSON.parse(products) : []
}

export function setStoredProducts(products: Product[]): void {
    localStorage.setItem('products', JSON.stringify(products))
}

export function addProduct(product: Product): void {
    const products = getStoredProducts()
    products.push(product)
    setStoredProducts(products)
    // Dispatch event to notify UI
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('productsUpdated'))
    }
}

export function updateProduct(productId: string, updatedProduct: Partial<Product>): void {
    const products = getStoredProducts()
    const index = products.findIndex(p => p.id === productId)
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct }
        setStoredProducts(products)
        // Dispatch event to notify UI
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('productsUpdated'))
        }
    }
}

export function deleteProduct(productId: string): void {
    const products = getStoredProducts()
    const filteredProducts = products.filter(p => p.id !== productId)
    setStoredProducts(filteredProducts)
    // Dispatch event to notify UI
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('productsUpdated'))
    }
}

export function updateProductStock(productId: string, newStock: number): void {
    const products = getStoredProducts()
    const product = products.find(p => p.id === productId)
    if (product) {
        product.stock = newStock
        setStoredProducts(products)
        // Dispatch event to notify UI
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('productsUpdated'))
        }
    }
}

export function generateProductId(): string {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 1000)
    return `p${timestamp}${random}`
}

// Customers Management (for admin)
export function getStoredCustomers(): Customer[] {
    if (typeof window === 'undefined') return []
    const customers = localStorage.getItem('customers')
    return customers ? JSON.parse(customers) : []
}

export function setStoredCustomers(customers: Customer[]): void {
    localStorage.setItem('customers', JSON.stringify(customers))
}

// Categories Management (for admin)
export interface Category {
    id: string
    nameEn: string
    nameHi: string
    icon?: string
}

export function getStoredCategories(): Category[] {
    if (typeof window === 'undefined') return []
    const categories = localStorage.getItem('categories')
    return categories ? JSON.parse(categories) : []
}

export function setStoredCategories(categories: Category[]): void {
    localStorage.setItem('categories', JSON.stringify(categories))
}

export function addCategory(category: Category): void {
    const categories = getStoredCategories()
    categories.push(category)
    setStoredCategories(categories)
}

export function updateCategory(categoryId: string, updatedCategory: Partial<Category>): void {
    const categories = getStoredCategories()
    const index = categories.findIndex(c => c.id === categoryId)
    if (index !== -1) {
        categories[index] = { ...categories[index], ...updatedCategory }
        setStoredCategories(categories)
    }
}

export function deleteCategory(categoryId: string): void {
    const categories = getStoredCategories()
    const filteredCategories = categories.filter(c => c.id !== categoryId)
    setStoredCategories(filteredCategories)
}

export function generateCategoryId(): string {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 1000)
    return `cat${timestamp}${random}`
}

// Language Preference
export function getLanguagePreference(): 'en' | 'hi' {
    if (typeof window === 'undefined') return 'en'
    return (localStorage.getItem('language') as 'en' | 'hi') || 'en'
}

export function setLanguagePreference(lang: 'en' | 'hi'): void {
    localStorage.setItem('language', lang)
}

// Generate Order ID
export function generateOrderId(): string {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 1000)
    return `ORD${timestamp}${random}`
}
