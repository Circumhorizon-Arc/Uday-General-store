/**
 * Helper function to properly encode image URLs
 * Handles paths with spaces and special characters
 */
export function getImageUrl(imagePath: string): string {
    if (!imagePath) return ''

    // If it's a data URL or already a full HTTP URL, return as-is
    if (imagePath.startsWith('data:') || imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath
    }

    // For local paths starting with /, encode the filename part
    if (imagePath.startsWith('/')) {
        // Split the path into parts
        const parts = imagePath.split('/')
        // Encode each part (except empty ones)
        const encodedParts = parts.map(part => part ? encodeURIComponent(part) : part)
        // Join back together
        return encodedParts.join('/')
    }

    return imagePath
}
