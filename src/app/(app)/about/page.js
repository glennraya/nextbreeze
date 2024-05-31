// 'use client'
// import Header from '@/app/(app)/Header'
// import { useAuth } from '@/hooks/auth'
// import { useEffect } from 'react'

export const metadata = {
    title: 'NextJS + Laravel - About Page',
}

const About = () => {
    // const { user } = useAuth({ middleware: 'auth' })

    return (
        <>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            This is the about page
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About
