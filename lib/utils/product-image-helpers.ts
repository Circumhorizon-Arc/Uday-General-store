import { products as defaultProducts } from '@/lib/data/products'

/**
 * Get the default image for a product by its ID
 * Falls back to a generic placeholder if product not found
 */
export function getDefaultProductImage(productId?: string): string {
    if (!productId) return ''

    const defaultProduct = defaultProducts.find(p => p.id === productId)
    return defaultProduct?.image || ''
}

/**
 * Get product image with fallback to default
 * Priority: custom image > default product image > empty string (will show cart icon)
 */
export function getProductImageWithFallback(customImage: string | undefined, productId?: string): string {
    // If custom image is provided and not empty, use it
    if (customImage && customImage.trim() !== '') {
        return customImage
    }

    // Otherwise, try to get default image for this product
    return getDefaultProductImage(productId)
}
