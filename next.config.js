/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            // GitHub image hosting
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'github.com',
            },
            {
                protocol: 'https',
                hostname: 'user-images.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
            // Add your custom Vercel domain here if needed
            // Example:
            // {
            //     protocol: 'https',
            //     hostname: 'your-custom-domain.com',
            // },
            // Or your Vercel deployment URL:
            {
                protocol: 'https',
                hostname: 'uday-general-store.vercel.app',
            },
        ],
    },
}

module.exports = nextConfig
