'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { isAdminLoggedIn } from '@/lib/utils/storage'
import AdminSidebar from '@/components/admin/Sidebar'
import AdminTopNav from '@/components/admin/TopNav'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const pathname = usePathname()
    const isLoginPage = pathname === '/admin/login'
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        if (!isAdminLoggedIn() && !isLoginPage) {
            router.push('/admin/login')
        }
    }, [router, isLoginPage])

    // Close sidebar on route change (mobile)
    useEffect(() => {
        setSidebarOpen(false)
    }, [pathname])

    // If on login page, render children without layout
    if (isLoginPage) {
        return <>{children}</>
    }

    // Otherwise, render with admin layout
    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-grow flex flex-col min-w-0">
                <AdminTopNav onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-grow p-4 sm:p-6 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    )
}
