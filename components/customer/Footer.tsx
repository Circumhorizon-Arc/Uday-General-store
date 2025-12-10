'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/context/LanguageContext'

export default function Footer() {
    const { t } = useLanguage()
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-white font-heading font-bold text-lg mb-4">
                            {t.hero.storeName}
                        </h3>
                        <p className="text-sm text-gray-400">
                            {t.hero.tagline}
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                            {t.hero.serviceArea}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">{t.footer.quickLinks}</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-sm hover:text-primary-400 transition-colors">
                                    {t.nav.home}
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop" className="text-sm hover:text-primary-400 transition-colors">
                                    {t.nav.shop}
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-sm hover:text-primary-400 transition-colors">
                                    {t.nav.about}
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm hover:text-primary-400 transition-colors">
                                    {t.nav.contact}
                                </Link>
                            </li>
                            <li>
                                <Link href="/orders" className="text-sm hover:text-primary-400 transition-colors">
                                    {t.nav.myOrders}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">{t.footer.contactInfo}</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{t.contact.addressText}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>{t.contact.phoneNumber}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>{t.contact.emailAddress}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">{t.footer.about}</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/privacy" className="text-sm hover:text-primary-400 transition-colors">
                                    {t.footer.privacyPolicy}
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-sm hover:text-primary-400 transition-colors">
                                    {t.footer.termsConditions}
                                </Link>
                            </li>
                            <li className="pt-2 border-t border-gray-800 mt-2">
                                <Link href="/admin/login" className="text-sm hover:text-primary-400 transition-colors inline-flex items-center gap-1.5">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Admin Login
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
                    <p>© {currentYear} {t.hero.storeName}. {t.footer.copyright.split('.')[1]}</p>
                </div>
            </div>
        </footer>
    )
}
