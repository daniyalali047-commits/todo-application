import './style/App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Addtask from './components/Addtask'
import List from './components/List'
import UpdateTask from './components/Update'
import Signup from './components/Signup'
import Login from './components/Login'
import Protected from './components/Protected'
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Protected><List /></Protected>} />
        <Route path='/add' element={<Protected><Addtask /></Protected>} />
        <Route path='/update/:id' element={<Protected><UpdateTask /></Protected>} />
         <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App