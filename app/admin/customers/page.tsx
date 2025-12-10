'use client'

import { useLanguage } from '@/lib/context/LanguageContext'
import { dummyCustomers } from '@/lib/data/dummy-data'

export default function AdminCustomersPage() {
    const { language, t } = useLanguage()

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.admin.customers}</h2>
                <p className="text-gray-600">
                    {dummyCustomers.length} {language === 'hi' ? 'ग्राहक' : 'customers'}
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-soft overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                    {language === 'hi' ? 'नाम' : 'Name'}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                    {language === 'hi' ? 'मोबाइल' : 'Mobile'}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                    {language === 'hi' ? 'क्षेत्र' : 'Area'}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                    {language === 'hi' ? 'कुल ऑर्डर' : 'Total Orders'}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                    {language === 'hi' ? 'कुल खर्च' : 'Total Spent'}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {dummyCustomers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-gray-900">{customer.name}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {customer.mobile}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        <div>{customer.area}</div>
                                        <div className="text-xs text-gray-500">{customer.pincode}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                        {customer.totalOrders}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-primary-600">
                                        ₹{customer.totalSpent}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
