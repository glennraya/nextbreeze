import ApplicationLogo from '@/components/ApplicationLogo'
import Dropdown from '@/components/Dropdown'
import Link from 'next/link'
import NavLink from '@/components/NavLink'
import ResponsiveNavLink, {
    ResponsiveNavButton,
} from '@/components/ResponsiveNavLink'
import { DropdownButton } from '@/components/DropdownLink'
import { useAuth } from '@/hooks/auth'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { axios } from '@/lib/axios'
import { Badge, Button } from '@nextui-org/react'
import { motion, useAnimation } from 'framer-motion'
import MessageIcon from '@/components/MessageIcon'
import useEcho from '@/hooks/echo'

const Navigation = () => {
    const controls = useAnimation()
    const { logout, user } = useAuth({ middleware: 'auth' })
    const echo = useEcho(user)

    const [open, setOpen] = useState(false)
    const [unreadMessages, setUnreadMessages] = useState(0)

    const triggerAnimation = () => {
        controls.start({
            scale: [1, 1.3, 1],
            transition: {
                duration: 0.5,
                ease: 'easeInOut',
                repeat: 1,
                repeatType: 'mirror',
            },
        })
    }

    const handleEchoCallback = () => {
        setUnreadMessages(prevUnread => prevUnread + 1)
        triggerAnimation()
    }

    useEffect(() => {
        if (echo)
            echo.private(`chat.${user?.id}`).listen('MessageSent', event => {
                if (event.receiver.id === user?.id)
                    console.log('Real-time event received: ', event)

                handleEchoCallback()
            })

        axios
            .post('/api/get-unread-messages', {
                user_id: user?.id,
            })
            .then(res => {
                setUnreadMessages(res.data)
            })

        return () => {
            if (echo) echo.leave(`chat.${user?.id}`)
        }
    }, [user, echo, unreadMessages, controls])

    return (
        <nav className="fixed z-20 w-full border-b border-gray-100 bg-white bg-opacity-10 backdrop-blur-md">
            {/* Primary Navigation Menu */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex">
                        {/* Logo */}
                        <div className="flex flex-shrink-0 items-center">
                            <Link href="/dashboard">
                                <ApplicationLogo className="block h-10 w-auto fill-current text-gray-600" />
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden space-x-8 text-sm sm:-my-px sm:ml-10 sm:flex">
                            <NavLink
                                href="/dashboard"
                                active={usePathname() === '/dashboard'}>
                                Dashboard
                            </NavLink>

                            <NavLink
                                href="/reports"
                                active={usePathname() === '/reports'}>
                                Reports
                            </NavLink>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <motion.div animate={controls}>
                            <Badge
                                content={unreadMessages}
                                shape="circle"
                                size="lg"
                                color="danger"
                                isInvisible={unreadMessages === 0}>
                                <Button
                                    radius="full"
                                    size="sm"
                                    variant="solid"
                                    color="primary"
                                    isIconOnly
                                    aria-label={`There are ${unreadMessages} unread messages.`}>
                                    <MessageIcon />
                                </Button>
                            </Badge>
                        </motion.div>

                        {/* Settings Dropdown */}
                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            <Dropdown
                                align="right"
                                width="48"
                                trigger={
                                    <button className="flex items-start text-sm font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none">
                                        <div className="flex flex-col items-start">
                                            <div className="text-black">
                                                {user?.name}
                                            </div>
                                            <div className="text-sm">
                                                {user?.role}
                                            </div>
                                        </div>

                                        <div className="ml-4">
                                            <svg
                                                className="h-4 w-4 fill-current"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    </button>
                                }>
                                {/* Authentication */}
                                <DropdownButton onClick={logout}>
                                    Logout
                                </DropdownButton>
                            </Dropdown>
                        </div>
                        {/* Hamburger */}
                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setOpen(open => !open)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none">
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24">
                                    {open ? (
                                        <path
                                            className="inline-flex"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            className="inline-flex"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Responsive Navigation Menu */}
            {open && (
                <div className="block sm:hidden">
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href="/dashboard"
                            active={usePathname() === '/dashboard'}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    {/* Responsive Settings Options */}
                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="flex items-center px-4">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-10 w-10 fill-current text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>

                            <div className="ml-3">
                                <div className="text-base font-medium text-gray-800">
                                    {user?.name}
                                </div>
                                <div className="text-sm font-medium text-gray-500">
                                    {user?.email}
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            {/* Authentication */}
                            <ResponsiveNavButton onClick={logout}>
                                Logout
                            </ResponsiveNavButton>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navigation
