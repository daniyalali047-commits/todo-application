export function authenticatedFetch(input, init = {}) {
    const headers = new Headers(init.headers)
    const token = sessionStorage.getItem('token')

    if (token) {
        headers.set('Authorization', `Bearer ${token}`)
    }

    // Define your live Vercel backend base URL here
    const BASE_URL = "https://todo-application-brown-one.vercel.app"

    // This automatically attaches your backend link to every request path (e.g. /auth becomes https://.../auth)
    return fetch(`${BASE_URL}${input}`, { ...init, headers })
}
