// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './QsrPage.css'; // Reuses QSR styling

// export default function Cart() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState(location.state?.cart || []);

//   const updateQuantity = (id, delta) => {
//     setCartItems(prev =>
//       prev.map(item =>
//         item.id === id
//           ? { ...item, quantity: Math.max(1, item.quantity + delta) }
//           : item
//       )
//     );
//   };

//   const removeItem = (id) => {
//     setCartItems(prev => prev.filter(item => item.id !== id));
//   };

//   const handleBuyNow = () => {
//     alert('🎉 Order placed successfully!');
//     setCartItems([]);
//   };

//   const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <div className="qsr-page">
//       <nav className="qsr-navbar">
//         <div className="navbar-left" onClick={() => navigate('/')}>
//           <img src="../assests/food.jpg" alt="Logo" className="navbar-logo" />
//           <h1 className="navbar-title">Cafe Co</h1>
//         </div>
//         <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
//       </nav>

//       <h2>Your Cart</h2>

//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div className="qsr-grid">
//           {cartItems.map(item => (
//             <div key={item.id} className="qsr-card" style={{ position: 'relative' }}>
//               {/* Cross icon top right */}
//               <span
//                 onClick={() => removeItem(item.id)}
//                 style={{
//                   position: 'absolute',
//                   top: '10px',
//                   right: '10px',
//                   cursor: 'pointer',
//                   fontSize: '1.2rem',
//                   color: '#dc2626'
//                 }}
//               >
//                 ❌
//               </span>

//               <img src={item.image} alt={item.name} className="qsr-image" />
//               <h3>{item.name}</h3>
//               <p>Price: ₹{item.price}</p>
//               <div className="cart-controls">
//                 <button onClick={() => updateQuantity(item.id, -1)}>-</button>
//                 <span>{item.quantity}</span>
//                 <button onClick={() => updateQuantity(item.id, 1)}>+</button>
//               </div>
//               <p>Total: ₹{item.price * item.quantity}</p>

//               {/* Add More Items inside the card */}
//               <button
//                 className="view-btn"
//                 onClick={() => navigate('/qsr')}
//                 style={{ marginTop: '10px' }}
//               >
//                 ➕ Add More Items
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Total & Buy Now section */}
//       {cartItems.length > 0 && (
//         <div style={{
//           marginTop: '2rem',
//           display: 'flex',
//           justifyContent: 'flex-end',
//           alignItems: 'center',
//           flexDirection: 'column',
//           gap: '0.5rem',
//         }}>
//           <p style={{ fontSize: '1.2rem' }}>
//             <strong>Total Items:</strong> {totalItems} &nbsp; | &nbsp;
//             <strong>Total Price:</strong> ₹{total}
//           </p>
//           {/* <button className="cart-icon" onClick={handleBuyNow}>
//             🛒 Buy Now
//           </button> */}

//           <button
//             className="buy-btn"
//             onClick={() => navigate('/payment', { state: { cart, total } })}
//           >
//             Buy Now
//           </button>

//         </div>
//       )}
//     </div>
//   );
// }


import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Cart.css';

export default function Cart() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemove = (id) => {
    // This function should ideally update cart in global state or localStorage
    alert('Removing item requires global cart state or lifting state up.');
  };

  return (
    <div className="cart-page">
      <nav className="qsr-navbar">
        <div className="navbar-left" onClick={() => navigate('/')}>
          <img src="../assests/food.jpg" alt="Logo" className="navbar-logo" />
          <h1 className="navbar-title">Cafe Co</h1>
        </div>
        <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
      </nav>

      <div className="cart-container">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="qsr-grid">
            {cart.map((item) => (
              <div key={item.id} className="qsr-card dish-card-large">
                <button
                  className="remove-icon"
                  onClick={() => handleRemove(item.id)}
                >
                  ❌
                </button>
                <img src={item.image} alt={item.name} className="qsr-image" />
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>

                <button
                  className="view-btn"
                  onClick={() => navigate('/qsr', { state: { selectedCity: item.city } })}
                >
                  ➕ Add More Items
                </button>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="checkout-section">
            <h3>Total Amount: ₹{total}</h3>
            <button
              className="cart-icon"
              onClick={() => navigate('/payment', { state: { cart, total } })}
            >
              🛒 Buy Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}