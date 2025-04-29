import  React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css'
import Home from './Pages/Home'
import CreateUser from './Pages/CreateUser'
import EditUser from './Pages/EditUser'
import UserList from './Pages/UserList'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/CreateUser" element={<CreateUser/>} />
      <Route path='/EditUser/:id' element={<EditUser/>} />
      <Route path='/UserList' element={<UserList/>} />
  </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
