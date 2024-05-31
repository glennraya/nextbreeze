import '@/app/global.css'

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
            <body className="antialiased">{children}</body>
        </html>
    )
}

export default RootLayout
