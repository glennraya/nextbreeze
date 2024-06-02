import Axios from 'axios'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        // Accept: 'application/json',
    },
    withCredentials: true,
    withXSRFToken: true,
})

// Function to set CSRF token
const setCsrfToken = csrfToken => {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
}

// Function to set Bearer token
const setBearerToken = token => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export { axios, setCsrfToken, setBearerToken }
// export default axios
