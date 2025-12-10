'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/lib/context/LanguageContext'

interface AdminSidebarProps {
    isOpen: boolean
    onClose: () => void
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
    const { t } = useLanguage()
    const pathname = usePathname()

    const menuItems = [
        { href: '/admin/dashboard', label: t.admin.dashboard, icon: '📊' },
        { href: '/admin/products', label: t.admin.products, icon: '📦' },
        { href: '/admin/orders', label: t.admin.orders, icon: '🛒' },
        { href: '/admin/customers', label: t.admin.customers, icon: '👥' },
        { href: '/admin/categories', label: t.admin.categories, icon: '📁' },
        { href: '/admin/inventory', label: t.admin.inventory, icon: '⚠️' },
        { href: '/admin/settings', label: t.admin.settings, icon: '⚙️' },
    ]

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50
                w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Logo */}
                <div className="p-6 border-b border-gray-200">
                    <Link href="/admin/dashboard" className="flex items-center gap-3" onClick={onClose}>
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">U</span>
                        </div>
                        <div>
                            <h2 className="font-heading font-bold text-lg text-gray-900">
                                {t.hero.storeName}
                            </h2>
                            <p className="text-xs text-gray-500">{t.admin.dashboard}</p>
                        </div>
                    </Link>
                </div>

                {/* Menu */}
                <nav className="flex-grow p-4 overflow-y-auto">
                    <ul className="space-y-2">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={onClose}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                                ? 'bg-primary-50 text-primary-700 font-semibold'
                                                : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="text-xl">{item.icon}</span>
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                {/* Back to Store */}
                <div className="p-4 border-t border-gray-200">
                    <a
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>{t.nav.home}</span>
                    </a>
                </div>
            </aside>
        </>
    )
}
