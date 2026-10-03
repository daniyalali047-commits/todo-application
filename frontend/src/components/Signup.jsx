import { useEffect , useState } from 'react'
import '../style/signup.css'
import { Link , useNavigate } from 'react-router-dom'

export default function Signup() {

    const [userdata, setUserData] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
    if (sessionStorage.getItem('token')) {
        navigate('/')
    }
}, [navigate])

    const handleSignup = async (e) => {
        e.preventDefault()          // stops the page reload

        let result = await fetch('/signup', {
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
            <h1>Create Your Account</h1>
            <form className="signup-form">
                <div className="input-group">
                    <input
                        onChange={(event) => setUserData({ ...userdata, name: event.target.value })}
                        type="text" name="name" placeholder=" " required />
                    <label>Enter your Name</label>
                </div>

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

                <button onClick = {handleSignup}type="submit" className="signup-btn">Sign Up</button>
                <Link className="login" to="/login">Go to login</Link>
            </form>
        </div>
    )
}