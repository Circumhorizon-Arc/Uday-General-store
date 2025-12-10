'use client'

import { useLanguage } from '@/lib/context/LanguageContext'

export default function AdminSettingsPage() {
    const { language, t } = useLanguage()

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.admin.settings}</h2>
                <p className="text-gray-600">
                    {language === 'hi' ? 'स्टोर सेटिंग्स प्रबंधित करें' : 'Manage store settings'}
                </p>
            </div>

            <div className="space-y-6">
                {/* Store Information */}
                <div className="bg-white rounded-xl shadow-soft p-6">
                    <h3 className="font-bold text-xl mb-4">
                        {language === 'hi' ? 'स्टोर जानकारी' : 'Store Information'}
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block font-semibold mb-2">
                                {language === 'hi' ? 'स्टोर का नाम' : 'Store Name'}
                            </label>
                            <input
                                type="text"
                                defaultValue="Uday General Store"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold mb-2">
                                {language === 'hi' ? 'पता' : 'Address'}
                            </label>
                            <textarea
                                defaultValue="Shop No. 15, Sector 7, Rohini, New Delhi - 110085"
                                rows={3}
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-semibold mb-2">
                                    {language === 'hi' ? 'फोन' : 'Phone'}
                                </label>
                                <input
                                    type="tel"
                                    defaultValue="+91 98765 43210"
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-2">
                                    {language === 'hi' ? 'ईमेल' : 'Email'}
                                </label>
                                <input
                                    type="email"
                                    defaultValue="contact@udaystore.in"
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Business Hours */}
                <div className="bg-white rounded-xl shadow-soft p-6">
                    <h3 className="font-bold text-xl mb-4">
                        {language === 'hi' ? 'व्यापार समय' : 'Business Hours'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold mb-2">
                                {language === 'hi' ? 'खुलने का समय' : 'Opening Time'}
                            </label>
                            <input
                                type="time"
                                defaultValue="08:00"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold mb-2">
                                {language === 'hi' ? 'बंद होने का समय' : 'Closing Time'}
                            </label>
                            <input
                                type="time"
                                defaultValue="22:00"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Delivery Settings */}
                <div className="bg-white rounded-xl shadow-soft p-6">
                    <h3 className="font-bold text-xl mb-4">
                        {language === 'hi' ? 'डिलीवरी सेटिंग्स' : 'Delivery Settings'}
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block font-semibold mb-2">
                                {language === 'hi' ? 'डिलीवरी शुल्क' : 'Delivery Charge'}
                            </label>
                            <input
                                type="number"
                                defaultValue="30"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold mb-2">
                                {language === 'hi' ? 'मुफ्त डिलीवरी के लिए न्यूनतम राशि' : 'Minimum Amount for Free Delivery'}
                            </label>
                            <input
                                type="number"
                                defaultValue="500"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-primary-700 transition-all active:scale-95">
                        {t.admin.save}
                    </button>
                </div>
            </div>
        </div>
    )
}
