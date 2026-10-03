import { useEffect, useState } from 'react'
import '../style/navbar.css'
import { Link, useNavigate } from 'react-router-dom'

function Navbar(){
  const [login, setLogin] = useState(localStorage.getItem('login'))
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('login')
    document.cookie = 'token=; Max-Age=0; Path=/'
    setLogin(null)
    setTimeout(() => {
      navigate('/login')
    }, 0)
  }
  useEffect(() => {
    const handleStorageChange = () => {
      setLogin(localStorage.getItem('login'))
    }
    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

    return (
      <nav className='navbar'>
        <div className='Logo'>TO-DO APP</div>
        <ul className='Nav-links'>
          {
            login ?
            <>
            <li> <Link to="/">List</Link></li>
            <li> <Link to="/add">Add task</Link></li>
            <li><Link to="/login" onClick={logout}>Logout</Link></li>

            </>:null
            
          }
            

        </ul>
      </nav>
    )
}
export default Navbar