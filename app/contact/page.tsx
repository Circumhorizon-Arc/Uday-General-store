'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/context/LanguageContext'
import Navbar from '@/components/customer/Navbar'
import Footer from '@/components/customer/Footer'

export default function ContactPage() {
    const { language, t } = useLanguage()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
        setTimeout(() => {
            setSubmitted(false)
            setFormData({ name: '', email: '', message: '' })
        }, 3000)
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow bg-gray-50">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
                            {t.contact.title}
                        </h1>
                        <p className="text-xl text-primary-100">
                            {language === 'hi'
                                ? 'हम आपकी सेवा के लिए यहां हैं'
                                : 'We\'re here to serve you'}
                        </p>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div>
                            <h2 className="font-heading font-bold text-3xl mb-8">
                                {language === 'hi' ? 'संपर्क जानकारी' : 'Contact Information'}
                            </h2>

                            <div className="space-y-6">
                                {/* Address */}
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">{t.contact.address}</h3>
                                        <p className="text-gray-600">{t.contact.addressText}</p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">{t.contact.phone}</h3>
                                        <p className="text-gray-600">{t.contact.phoneNumber}</p>
                                        <a
                                            href={`tel:${t.contact.phoneNumber.replace(/\s/g, '')}`}
                                            className="text-primary-600 hover:underline text-sm"
                                        >
                                            {language === 'hi' ? 'कॉल करें' : 'Call Now'}
                                        </a>
                                    </div>
                                </div>

                                {/* WhatsApp */}
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-2xl">💬</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">{t.contact.whatsapp}</h3>
                                        <p className="text-gray-600">{t.contact.phoneNumber}</p>
                                        <a
                                            href={`https://wa.me/${t.contact.phoneNumber.replace(/[^0-9]/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-secondary-600 hover:underline text-sm"
                                        >
                                            {language === 'hi' ? 'व्हाट्सएप पर चैट करें' : 'Chat on WhatsApp'}
                                        </a>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">{t.contact.email}</h3>
                                        <p className="text-gray-600">{t.contact.emailAddress}</p>
                                    </div>
                                </div>

                                {/* Business Hours */}
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">{t.contact.hours}</h3>
                                        <p className="text-gray-600">{t.contact.hoursText}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Map */}
                            <div className="mt-8 bg-gray-200 rounded-xl h-64 flex items-center justify-center">
                                <p className="text-gray-500">
                                    {language === 'hi' ? '🗺️ मानचित्र यहाँ होगा' : '🗺️ Map would be here'}
                                </p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <div className="bg-white rounded-xl shadow-soft p-8">
                                <h2 className="font-heading font-bold text-3xl mb-6">
                                    {t.contact.sendMessage}
                                </h2>

                                {submitted ? (
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">✅</div>
                                        <h3 className="text-2xl font-bold text-secondary-600 mb-2">
                                            {language === 'hi' ? 'संदेश भेजा गया!' : 'Message Sent!'}
                                        </h3>
                                        <p className="text-gray-600">
                                            {language === 'hi'
                                                ? 'हम जल्द ही आपसे संपर्क करेंगे'
                                                : 'We\'ll get back to you soon'}
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block font-semibold mb-2">{t.contact.yourName}</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-semibold mb-2">{t.contact.yourEmail}</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-semibold mb-2">{t.contact.yourMessage}</label>
                                            <textarea
                                                required
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                rows={5}
                                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-primary-700 transition-all active:scale-95"
                                        >
                                            {t.contact.submit}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
