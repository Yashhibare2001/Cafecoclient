
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './COMPONENT/Pages/Home'
import Login from './COMPONENT/Auth/Login'
import Register from './COMPONENT/Auth/Register'

import QsrPage from './COMPONENT/Pages/QsrPage'
import Cart from './COMPONENT/Pages/Cart'



// import Navbar from './COMPONENT/Navbar/Navbar'

function App() {

  return (
    <Router>
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/qsr" element={<QsrPage/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Register" element={<Register/>} />
        
      </Routes>
    </Router>
  )
}

export default App
