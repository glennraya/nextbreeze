'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/auth'
import Header from '@/app/(app)/Header'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import Button from '@/components/Button'
import { axios } from '@/lib/axios'

const Dashboard = () => {
    const [message, setMessage] = useState('')
    const [token, setToken] = useState('')
    const { user } = useAuth({ middleware: 'auth' })

    useEffect(() => {
        window.Pusher = Pusher

        // axios.post('/api/tokens/create').then(res => {
        //     setToken(res)
        // })

        window.Echo = new Echo({
            broadcaster: 'reverb',
            key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
            encrypted: false,
            // auth: {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // },
            authorizer: channel => {
                return {
                    authorize: (socketId, callback) => {
                        axios
                            .post('/api/broadcasting/auth', {
                                socket_id: socketId,
                                channel_name: channel.name,
                            })
                            .then(response => {
                                console.log(response)

                                callback(false, response.data)
                            })
                            .catch(error => {
                                callback(true, error)
                            })
                    },
                }
            },

            wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
            wsPort: process.env.NEXT_PUBLIC_REVERB_PORT,
            wssPort: process.env.NEXT_PUBLIC_REVERB_PORT,
            forceTLS:
                (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? 'https') === 'https',
            enabledTransports: ['ws', 'wss'],
        })
        window.Echo.private(`notifications.${user?.id}`).listen(
            'EmailSent',
            event => {
                console.log('aaa')
                setMessage(event?.message)
            },
        )
    }, [user, message])

    return (
        <>
            <Header title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            Welcome {user?.name}, you are logged in!
                            <br />
                            The message: {message}
                            <br />
                            <Button>Test</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
