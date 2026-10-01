import '../style/navbar.css'
import {Link} from 'react-router-dom'
function Navbar(){
    return (
      <nav className='navbar'>
        <div className='Logo'>TO-DO APP</div>
        <ul className='Nav-links'>
            <li> <Link to="/">list</Link></li>
            <li> <Link to="/add">Add task</Link></li>

        </ul>
      </nav>
    )
}
export default Navbar