import { Link } from 'react-router-dom'
import './Navbar.css'  // CSS file we'll create next

export default function Navbar() {
  return (
    // <nav className="navbar">
    //   <div className="navbar-container">
    //     <Link to="/" className="navbar-logo">
    //       Corporate Cafeteria
    //     </Link>

    //     <div className="navbar-links">
    //       <Link to="/qsr" className="navbar-link">QSR Order</Link>
    //       <Link to="/booking" className="navbar-link">Pre-Meal Booking</Link>
    //       <Link to="/about" className="navbar-link">About</Link>
    //       <Link to="/contact" className="navbar-link">Contact</Link>
    //     </div>
    //   </div>
    // </nav>

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
