import '@/app/global.css'
import * as React from 'react'
import { NextUIProvider } from '@nextui-org/react'

export const metadata = {
    title: 'NextJS + Laravel',
}

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <head>
                <title>{metadata.title}</title>
                {/* Add other global meta tags here */}
            </head>
            <body className="antialiased">
                <NextUIProvider>{children}</NextUIProvider>
            </body>
        </html>
    )
}

export default RootLayout
