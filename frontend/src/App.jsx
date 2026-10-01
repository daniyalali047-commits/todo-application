import './style/App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Addtask from './components/Addtask'
import List from './components/List'
import UpdateTask from './components/Update'
import Signup from './components/Signup'
import Login from './components/Login'
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<List />} />
        <Route path='/add' element={<Addtask />} />
        <Route path='/update/:id' element={<UpdateTask />} />
         <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App