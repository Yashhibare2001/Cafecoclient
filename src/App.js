
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './COMPONENT/Pages/Home'
import Login from './COMPONENT/Auth/Login'
import Register from './COMPONENT/Auth/Register'

import QsrPage from './COMPONENT/Pages/QsrPage'
import Cart from './COMPONENT/Pages/Cart'
import Dashboard from './COMPONENT/Pages/Dashboard'
import Prebooking from './COMPONENT/Pages/Prebooking'
import About from './COMPONENT/Pages/About'
import Payment from './COMPONENT/Pages/Payment'
import Order from './COMPONENT/Pages/Order'
import Bookingconfirmation from './COMPONENT/Pages/Bookingconfirmation'


// import Navbar from './COMPONENT/Navbar/Navbar'

function App() {

  

  return (
    <Router>
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/qsr" element={<QsrPage/>} />
          <Route path="/PreBookMeal" element={<Prebooking/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/About" element={<About/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Payment" element={<Payment/>} />
        <Route path="/order" element={<Order/>} />
        <Route path="/Register" element={<Register/>} />
         <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/Bookingconfirmation" element={<Bookingconfirmation/>} />
        
      </Routes>
    </Router>
  )
}

export default App
