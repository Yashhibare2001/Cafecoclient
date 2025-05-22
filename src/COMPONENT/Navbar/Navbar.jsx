import { Link } from 'react-router-dom'
import './Navbar.css'  

export default function Navbar() {
  return (


    <nav className="navbar">
            <div className="navbar-left">
              <img 
                src="../assests/food.jpg" 
                alt="Corporate Cafeteria Logo" 
                className="navbar-logo" 
              />
              <h1 className="navbar-title">Corporate Cafeteria</h1>
            </div>
            <ul className="navbar-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/qsr">QSR Order</Link></li>
              <li><Link to="/booking">Pre-Meal Booking</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
  )
}
