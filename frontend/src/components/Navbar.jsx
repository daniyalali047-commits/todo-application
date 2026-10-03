import { useEffect, useState } from 'react'
import '../style/navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import todoIcon from '../assets/todo-icon.png'

function Navbar(){
  const [login, setLogin] = useState(sessionStorage.getItem('login'))
  const navigate = useNavigate()
  const logout = () => {
    sessionStorage.removeItem('login')
    sessionStorage.removeItem('token')
    setLogin(null)
    setTimeout(() => {
      navigate('/login')
    }, 0)
  }
  useEffect(() => {
    const handleStorageChange = () => {
      setLogin(sessionStorage.getItem('login'))
    }
    window.addEventListener('auth-change', handleStorageChange)
    return () => {
      window.removeEventListener('auth-change', handleStorageChange)
    }
  }, [])

    return (
      <nav className='navbar'>
        <Link to='/' className='Logo' aria-label='MY-TODOS home'>
          <img src={todoIcon} alt="" className="Logo-icon" />
          <span>MY-TODOS</span>
        </Link>
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