'use client'

import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/context/LanguageContext'
import LanguageToggle from '@/components/shared/LanguageToggle'
import { clearAdminSession } from '@/lib/utils/storage'

interface AdminTopNavProps {
    onMenuClick: () => void
}

export default function AdminTopNav({ onMenuClick }: AdminTopNavProps) {
    const { t } = useLanguage()
    const router = useRouter()

    const handleLogout = () => {
        clearAdminSession()
        router.push('/admin/login')
    }

    return (
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sticky top-0 z-30">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Hamburger Menu Button */}
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t.admin.dashboard}</h1>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <LanguageToggle />

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-all text-sm sm:text-base"
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="hidden sm:inline">{t.admin.logout}</span>
                    </button>
                </div>
            </div>
        </header>
    )
}
