import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Pusher = Pusher
const echo = new Echo({
    broadcaster: 'reverb',
    key: '5jf2kovbrv9ub2f7sxtn',
    wsHost: 'localhost:8000',
    wsPort: '8080',
    wssPort: '8080',
    forceTLS: ('http' ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
})

export default echo
