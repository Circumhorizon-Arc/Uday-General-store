'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import enTranslations from '@/lib/translations/en.json'
import hiTranslations from '@/lib/translations/hi.json'

type Language = 'en' | 'hi'

interface LanguageContextType {
    language: Language
    toggleLanguage: () => void
    t: any
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('en')
    const [translations, setTranslations] = useState(enTranslations)

    useEffect(() => {
        // Load language preference from localStorage
        const savedLanguage = localStorage.getItem('language') as Language
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'hi')) {
            setLanguage(savedLanguage)
            setTranslations(savedLanguage === 'hi' ? hiTranslations : enTranslations)
        }
    }, [])

    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'hi' : 'en'
        setLanguage(newLanguage)
        setTranslations(newLanguage === 'hi' ? hiTranslations : enTranslations)
        localStorage.setItem('language', newLanguage)
    }

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t: translations }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
