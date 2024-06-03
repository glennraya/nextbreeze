'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/auth'
import { axios } from '@/lib/axios'
import {
    Button,
    Image,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from '@nextui-org/react'
import Header from '@/app/(app)/Header'
import ChatIcon from '@/components/ChatIcon'

const Dashboard = () => {
    const { user } = useAuth({ middleware: 'auth' })
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

    const [receiver, setReceiver] = useState(null)
    const [messageTo, setMessageTo] = useState(null)
    const [message, setMessage] = useState('')
    const [isSending, setIsSending] = useState(false)
    const [team, setTeam] = useState([])

    useEffect(() => {
        if (user?.role === 'Product Owner')
            axios.post('/api/get-team-members').then(res => {
                setTeam(res.data)
            })
    }, [user])

    const composeMessage = member => {
        setMessageTo(member.name)
        setReceiver(member.id)
        onOpen()
    }

    const sendMessage = receiver => {
        setIsSending(true)

        axios
            .post('/api/send-message', {
                user_id: receiver,
                from: user?.id,
                message: message,
            })
            .then(res => {
                if (res.statusText === 'No Content') {
                    setIsSending(false)
                    onClose()
                }
            })
    }

    return (
        <>
            <Header
                title={
                    user?.role === 'Product Owner'
                        ? `Fix the bugs! 🐞`
                        : `It works on my machine! 😎`
                }
            />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                            {team.map(member => (
                                <div
                                    key={member.id}
                                    className={`relative flex rounded-lg border-2 border-gray-300 bg-white p-4 shadow-md shadow-gray-300/20 transition duration-700 ease-in-out`}>
                                    <div className="flex w-full flex-col gap-5">
                                        <div className="flex h-full flex-col gap-4">
                                            <Image
                                                alt="Woman listing to music"
                                                className="w-full object-cover"
                                                height={64}
                                                src={
                                                    `https://ui-avatars.com/api/?size=256&name=` +
                                                    member.name
                                                }
                                                width={64}
                                                radius="full"
                                            />

                                            <div className="flex h-full flex-col">
                                                <h3 className="text-lg font-bold">
                                                    {member?.name}
                                                </h3>
                                                <h4 className="text-sm text-gray-500">
                                                    {member?.role}
                                                </h4>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium text-blue-400">
                                                Tasks Completed
                                            </span>
                                            <span className="font-medium">
                                                <span className="text-xl">
                                                    8
                                                </span>
                                                <span className="text-gray-500">
                                                    /
                                                </span>
                                                <span className="text-gray-500">
                                                    12
                                                </span>
                                            </span>
                                        </div>

                                        <div className="flex w-full">
                                            <Button
                                                className="w-full bg-black py-6 text-white"
                                                size="md"
                                                radius="md"
                                                onClick={() =>
                                                    composeMessage(member)
                                                }>
                                                <ChatIcon />
                                                Send message
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                backdrop="blur"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                    body: 'py-6',

                    base: 'border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-white',
                    header: 'border-b-[1px] border-[#292f46]',
                    footer: 'border-t-[1px] border-[#292f46]',
                    closeButton: 'hover:bg-white/5 active:bg-white/10',
                }}>
                <ModalContent>
                    {onClose => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Send Message
                            </ModalHeader>
                            <ModalBody>
                                <p className="">Send to {messageTo}</p>
                                <textarea
                                    className="rounded-xl bg-gray-800 p-3 outline-none"
                                    rows="5"
                                    placeholder="Compose your message"
                                    onChange={event =>
                                        setMessage(event.target.value)
                                    }
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    isLoading={isSending ? true : false}
                                    onPress={() => sendMessage(receiver)}>
                                    {isSending ? 'Sending...' : 'Send'}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default Dashboard
