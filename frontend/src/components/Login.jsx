import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authenticatedFetch } from '../utils/api'; // This utility attaches your live backend URL

export default function Login() {

    const [userdata, setUserData] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            navigate('/')
        }
    }, [navigate])

    const handlelogin = async (e) => {
        e.preventDefault()          // stops the page reload

        // CHANGED: Swapped native fetch() with your custom authenticatedFetch() utility
        let result = await authenticatedFetch('/login', {
            method: 'POST',
            body: JSON.stringify({ ...userdata }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        result = await result.json()
        console.log(result)
        if (result.success && result.token) {
            sessionStorage.setItem('token', result.token)
            sessionStorage.setItem('login', userdata.email || userdata.name)
            window.dispatchEvent(new Event('auth-change'))
            navigate('/')
        } else {
            alert("Invalid Credentials")
        }
    }

    return (
        <div className="signup-wrapper">
            <h1>Login Now</h1>
            <form className="signup-form">

                <div className="input-group">
                    <input
                        onChange={(event) => setUserData({ ...userdata, email: event.target.value })}
                        type="email" name="email" placeholder=" " required />
                    <label>Enter your Email</label>
                </div>

                <div className="input-group">
                    <input
                        onChange={(event) => setUserData({ ...userdata, password: event.target.value })}
                        type="password" name="password" placeholder=" " required />
                    <label>Enter your Password</label>
                </div>

                <button onClick={handlelogin} type="submit" className="signup-btn">Login</button>
                <Link className="login" to="/signup">Dont have an account? Sign up</Link>
            </form>
        </div>
    )
}
