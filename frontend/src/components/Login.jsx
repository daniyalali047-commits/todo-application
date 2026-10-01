import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {

    const [userdata, setUserData] = useState({})

    const handlelogin = async (e) => {
        e.preventDefault()          // stops the page reload

        let result = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ ...userdata }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        result = await result.json()
        console.log(result)
        document.cookie="token="+result.token
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

                <button onClick = {handlelogin}type="submit" className="signup-btn">Login</button>
                <Link className = "login"to="/signup">Go to SignUp</Link>
            </form>
        </div>
    )
}