'use client'

import { useLanguage } from '@/lib/context/LanguageContext'
import Navbar from '@/components/customer/Navbar'
import Footer from '@/components/customer/Footer'

export default function TermsPage() {
    const { language } = useLanguage()

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h1 className="font-heading font-bold text-4xl mb-8">
                        {language === 'hi' ? 'नियम और शर्तें' : 'Terms & Conditions'}
                    </h1>

                    <div className="bg-white rounded-xl shadow-soft p-8 space-y-6">
                        <section>
                            <h2 className="font-bold text-2xl mb-4 text-primary-600">
                                {language === 'hi' ? '1. सेवा की शर्तें' : '1. Terms of Service'}
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                {language === 'hi'
                                    ? 'इस वेबसाइट का उपयोग करके, आप इन नियमों और शर्तों से सहमत होते हैं। कृपया ऑर्डर करने से पहले इन्हें ध्यान से पढ़ें।'
                                    : 'By using this website, you agree to these terms and conditions. Please read them carefully before placing an order.'}
                            </p>
                        </section>

                        <section>
                            <h2 className="font-bold text-2xl mb-4 text-primary-600">
                                {language === 'hi' ? '2. ऑर्डर और भुगतान' : '2. Orders and Payment'}
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                {language === 'hi'
                                    ? 'सभी ऑर्डर हमारी स्वीकृति के अधीन हैं। हम UPI और कैश ऑन डिलीवरी दोनों स्वीकार करते हैं। ₹500 से अधिक के ऑर्डर पर मुफ्त डिलीवरी।'
                                    : 'All orders are subject to our acceptance. We accept both UPI and Cash on Delivery. Free delivery on orders above ₹500.'}
                            </p>
                        </section>

                        <section>
                            <h2 className="font-bold text-2xl mb-4 text-primary-600">
                                {language === 'hi' ? '3. डिलीवरी' : '3. Delivery'}
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                {language === 'hi'
                                    ? 'हम रोहिणी, पीतमपुरा, शालीमार बाग और आसपास के क्षेत्रों में डिलीवरी करते हैं। डिलीवरी का समय 1-2 घंटे है।'
                                    : 'We deliver to Rohini, Pitampura, Shalimar Bagh and nearby areas. Delivery time is 1-2 hours.'}
                            </p>
                        </section>

                        <section>
                            <h2 className="font-bold text-2xl mb-4 text-primary-600">
                                {language === 'hi' ? '4. रिटर्न और रिफंड' : '4. Returns and Refunds'}
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                {language === 'hi'
                                    ? 'क्षतिग्रस्त या गलत उत्पादों के लिए डिलीवरी के 24 घंटे के भीतर हमसे संपर्क करें। हम तुरंत प्रतिस्थापन या रिफंड प्रदान करेंगे।'
                                    : 'Contact us within 24 hours of delivery for damaged or wrong products. We will provide immediate replacement or refund.'}
                            </p>
                        </section>

                        <section>
                            <h2 className="font-bold text-2xl mb-4 text-primary-600">
                                {language === 'hi' ? '5. संपर्क जानकारी' : '5. Contact Information'}
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                {language === 'hi'
                                    ? 'किसी भी प्रश्न या चिंता के लिए, कृपया हमसे +91 98765 43210 पर संपर्क करें या contact@udaystore.in पर ईमेल करें।'
                                    : 'For any questions or concerns, please contact us at +91 98765 43210 or email contact@udaystore.in.'}
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
