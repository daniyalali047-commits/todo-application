import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function Protected({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const [verificationError, setVerificationError] = useState('')

    useEffect(() => {
        let isActive = true

        fetch('/auth', { credentials: 'include' })
            .then((response) => {
                if (response.status === 401) {
                    localStorage.removeItem('login')
                    window.dispatchEvent(new Event('storage'))
                    if (isActive) setIsAuthenticated(false)
                    return
                }

                if (!response.ok) {
                    throw new Error(`Session verification failed (${response.status})`)
                }

                if (isActive) setIsAuthenticated(true)
            })
            .catch((error) => {
                console.error('Unable to verify login session:', error)
                if (isActive) {
                    setVerificationError('Unable to verify your login. Please try again.')
                }
            })

        return () => {
            isActive = false
        }
    }, [])

    if (verificationError) {
        return <p role="alert">{verificationError}</p>
    }

    if (isAuthenticated === null) {
        return <p>Checking your login...</p>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children
}