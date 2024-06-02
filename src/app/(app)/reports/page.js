// 'use client'
// import Header from '@/app/(app)/Header'
// import { useAuth } from '@/hooks/auth'
// import { useEffect } from 'react'

export const metadata = {
    title: 'NextJS + Laravel - Reports Page',
}

const Reports = () => {
    // const { user } = useAuth({ middleware: 'auth' })

    return (
        <>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-gray-200 bg-white p-6">
                            This is the reports page
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reports
