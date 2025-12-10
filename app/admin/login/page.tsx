'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/context/LanguageContext'
import { validateAdminCredentials, setAdminSession } from '@/lib/utils/storage'

export default function AdminLoginPage() {
    const { language, t } = useLanguage()
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (validateAdminCredentials(formData.email, formData.password)) {
            setAdminSession({ email: formData.email, isLoggedIn: true })
            router.push('/admin/dashboard')
        } else {
            setError(t.admin.invalidCredentials)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-orange-600 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <div className="inline-block bg-white rounded-2xl p-4 mb-4 shadow-lg">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-3xl">U</span>
                        </div>
                    </div>
                    <h1 className="text-white font-heading font-bold text-3xl mb-2">
                        {language === 'hi' ? 'उदय जनरल स्टोर' : 'Uday General Store'}
                    </h1>
                    <p className="text-primary-100 text-lg">
                        {t.admin.loginTitle}
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block font-semibold text-gray-700 mb-2">
                                {t.admin.email}
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="admin@udaystore.in"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold text-gray-700 mb-2">
                                {t.admin.password}
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Admin@789"
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-primary-700 transition-all active:scale-95 shadow-lg"
                        >
                            {t.admin.loginButton}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-600 text-center">
                            {language === 'hi' ? 'डेमो क्रेडेंशियल्स:' : 'Demo Credentials:'}
                        </p>
                        <p className="text-xs text-gray-500 text-center mt-1">
                            admin@udaystore.in / Admin@789
                        </p>
                    </div>
                </div>

                {/* Back to Store */}
                <div className="text-center mt-6">
                    <a
                        href="/"
                        className="text-white hover:text-primary-100 font-medium inline-flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {language === 'hi' ? 'स्टोर पर वापस जाएं' : 'Back to Store'}
                    </a>
                </div>
            </div>
        </div>
    )
}
