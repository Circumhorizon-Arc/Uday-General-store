import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/lib/context/LanguageContext'

export const metadata: Metadata = {
    title: 'Uday General Store - Your Daily Needs, Delivered Fresh',
    description: 'Delhi-based general store offering groceries, snacks, dairy, and personal care products. Serving Rohini, Pitampura, Shalimar Bagh & nearby areas.',
    keywords: 'general store, kirana store, Delhi, groceries, snacks, dairy products, home delivery',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <LanguageProvider>
                    {children}
                </LanguageProvider>
            </body>
        </html>
    )
}
