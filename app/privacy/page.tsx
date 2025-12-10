'use client'

import { useLanguage } from '@/lib/context/LanguageContext'
import Navbar from '@/components/customer/Navbar'
import Footer from '@/components/customer/Footer'

export default function PrivacyPage() {
    const { language } = useLanguage()

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h1 className="font-heading font-bold text-4xl mb-8">
                        {language === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
                    </h1>

                    <div className="bg-white rounded-xl shadow-soft p-8 space-y-6">
                        <section>
                            <h2 className="font-bold text-2xl mb-4 text-primary-600">
                                {language === 'hi' ? '1. जानकारी संग्रह' : '1. Information Collection'}
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                {language === 'hi'
                                    ? 'हम आपकी व्यक्तिगत जानकारी जैसे नाम, मोबाइल नंबर, और पता केवल ऑर्डर डिलीवरी के उद्देश्य से एकत्र करते हैं। यह जानकारी सुरक्षित रूप से संग्रहीत की जाती है।'
                                    : 'We collect your personal information such as name, mobile number, and address only for order delivery purposes. This information is stored securely.'}
                            </p>
                        </section>

                        <section>
                            <h2 className="font-bold text-2xl mb-4 text-primary-600">
                                {language === 'hi' ? '2. जानकारी का उपयोग' : '2. Use of Information'}
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                {language === 'hi'
                                    ? 'आपकी जानकारी का उपयोग केवल ऑर्डर प्रोसेसिंग, डिलीवरी, और ग्राहक सेवा के लिए किया जाता है। हम आपकी जानकारी किसी तीसरे पक्ष के साथ साझा नहीं करते हैं।'
                                    : 'Your information is used only for order processing, delivery, and customer service. We do not share your information with third parties.'}
                            </p>
                        </section>

                        <section>
                            <h2 className="font-bold text-2xl mb-4 text-primary-600">
                                {language === 'hi' ? '3. डेटा सुरक्षा' : '3. Data Security'}
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                {language === 'hi'
                                    ? 'हम आपकी व्यक्तिगत जानकारी की सुरक्षा के लिए उचित उपाय करते हैं। आपका डेटा एन्क्रिप्टेड और सुरक्षित सर्वर पर संग्रहीत किया जाता है।'
                                    : 'We take appropriate measures to protect your personal information. Your data is encrypted and stored on secure servers.'}
                            </p>
                        </section>

                        <section>
                            <h2 className="font-bold text-2xl mb-4 text-primary-600">
                                {language === 'hi' ? '4. कुकीज़' : '4. Cookies'}
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                {language === 'hi'
                                    ? 'हम आपके अनुभव को बेहतर बनाने के लिए कुकीज़ का उपयोग करते हैं। आप अपनी ब्राउज़र सेटिंग्स में कुकीज़ को अक्षम कर सकते हैं।'
                                    : 'We use cookies to enhance your experience. You can disable cookies in your browser settings.'}
                            </p>
                        </section>

                        <section>
                            <h2 className="font-bold text-2xl mb-4 text-primary-600">
                                {language === 'hi' ? '5. संपर्क करें' : '5. Contact Us'}
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                {language === 'hi'
                                    ? 'यदि आपके पास गोपनीयता नीति के बारे में कोई प्रश्न हैं, तो कृपया हमसे contact@udaystore.in पर संपर्क करें।'
                                    : 'If you have any questions about our privacy policy, please contact us at contact@udaystore.in.'}
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
