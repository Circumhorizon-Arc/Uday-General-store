'use client'

import { useLanguage } from '@/lib/context/LanguageContext'
import Navbar from '@/components/customer/Navbar'
import Footer from '@/components/customer/Footer'

export default function AboutPage() {
    const { language, t } = useLanguage()

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow bg-gray-50">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
                            {t.about.title}
                        </h1>
                        <p className="text-xl text-primary-100">
                            {language === 'hi'
                                ? '10+ वर्षों से दिल्ली समुदाय की सेवा'
                                : 'Serving Delhi Community for 10+ Years'}
                        </p>
                    </div>
                </section>

                {/* Story Section */}
                <section className="py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-xl shadow-soft p-8 md:p-12">
                            <h2 className="font-heading font-bold text-3xl mb-6 text-primary-600">
                                {t.about.story}
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                {t.about.storyText}
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {language === 'hi'
                                    ? 'हम अपने ग्राहकों को परिवार के सदस्यों की तरह मानते हैं और हर दिन उनकी जरूरतों को पूरा करने के लिए प्रतिबद्ध हैं। चाहे वह सुबह का ताजा दूध हो या देर रात की जरूरी चीज, हम हमेशा आपकी सेवा के लिए तैयार हैं।'
                                    : 'We treat our customers like family members and are committed to fulfilling their needs every day. Whether it\'s fresh morning milk or a late-night essential, we are always ready to serve you.'}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="font-heading font-bold text-3xl mb-4 text-primary-600">
                                {t.about.mission}
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {t.about.missionText}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="font-heading font-bold text-3xl text-center mb-12">
                            {t.about.values}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-xl shadow-soft p-8 text-center">
                                <div className="text-5xl mb-4">✨</div>
                                <h3 className="font-bold text-xl mb-3 text-gray-900">{t.about.quality}</h3>
                                <p className="text-gray-600">
                                    {language === 'hi'
                                        ? 'हम केवल उच्च गुणवत्ता वाले उत्पाद ही बेचते हैं'
                                        : 'We sell only high-quality products'}
                                </p>
                            </div>

                            <div className="bg-white rounded-xl shadow-soft p-8 text-center">
                                <div className="text-5xl mb-4">🤝</div>
                                <h3 className="font-bold text-xl mb-3 text-gray-900">{t.about.trust}</h3>
                                <p className="text-gray-600">
                                    {language === 'hi'
                                        ? 'विश्वास और ईमानदारी हमारी नींव है'
                                        : 'Trust and honesty are our foundation'}
                                </p>
                            </div>

                            <div className="bg-white rounded-xl shadow-soft p-8 text-center">
                                <div className="text-5xl mb-4">💚</div>
                                <h3 className="font-bold text-xl mb-3 text-gray-900">{t.about.service}</h3>
                                <p className="text-gray-600">
                                    {language === 'hi'
                                        ? 'ग्राहक संतुष्टि हमारी प्राथमिकता है'
                                        : 'Customer satisfaction is our priority'}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact CTA */}
                <section className="py-16 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="font-heading font-bold text-3xl mb-4">
                            {language === 'hi' ? 'हमसे संपर्क करें' : 'Get in Touch'}
                        </h2>
                        <p className="text-xl mb-8">
                            {language === 'hi'
                                ? 'कोई सवाल? हम मदद के लिए यहां हैं!'
                                : 'Have questions? We\'re here to help!'}
                        </p>
                        <a
                            href="/contact"
                            className="inline-block bg-white text-secondary-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all active:scale-95"
                        >
                            {t.nav.contact}
                        </a>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
