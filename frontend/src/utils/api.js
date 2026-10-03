export function authenticatedFetch(input, init = {}) {
    const headers = new Headers(init.headers)
    const token = sessionStorage.getItem('token')

    if (token) {
        headers.set('Authorization', `Bearer ${token}`)
    }

    return fetch(input, { ...init, headers })
}
