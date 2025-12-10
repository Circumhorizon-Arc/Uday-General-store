'use client'

import { useLanguage } from '@/lib/context/LanguageContext'

export default function LanguageToggle() {
    const { language, toggleLanguage } = useLanguage()

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border-2 border-primary-500 text-primary-600 font-medium hover:bg-primary-50 transition-all duration-200"
            aria-label="Toggle Language"
        >
            <span className="text-sm font-semibold">
                {language === 'en' ? 'हिंदी' : 'English'}
            </span>
            <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
            </svg>
        </button>
    )
}
