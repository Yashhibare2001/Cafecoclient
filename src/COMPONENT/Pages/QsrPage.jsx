
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './QsrPage.css';

// export default function QsrPage() {
//   const [restaurants, setRestaurants] = useState([]);
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [selectedRestaurant, setSelectedRestaurant] = useState(null);
//   const [selectedDish, setSelectedDish] = useState(null);
//   const [cart, setCart] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get('https://cafecoserver.onrender.com/restaurants')
//       .then(res => setRestaurants(res.data))
//       .catch(err => console.error('Error loading restaurant data:', err));
//   }, []);

//   const cityMap = restaurants.reduce((acc, rest) => {
//     if (!acc[rest.city]) acc[rest.city] = [];
//     acc[rest.city].push(rest);
//     return acc;
//   }, {});

//   const handleCitySelect = (city) => {
//     setSelectedCity(city);
//     setSelectedRestaurant(null);
//     setSelectedDish(null);
//   };

//   const handleRestaurantSelect = (restaurant) => {
//     setSelectedRestaurant(restaurant);
//     setSelectedDish(null);
//   };

//   const handleDishSelect = (dish) => {
//     setSelectedDish(dish);
//   };

//   const goBack = () => {
//     if (selectedDish) {
//       setSelectedDish(null);
//     } else if (selectedRestaurant) {
//       setSelectedRestaurant(null);
//     } else {
//       setSelectedCity(null);
//     }
//   };

//   const handleAddToCart = (dish) => {
//     const dishWithId = {
//       ...dish,
//       id: selectedRestaurant.restaurant + '_' + dish.name,
//     };

//     setCart(prev => {
//       const existing = prev.find(item => item.id === dishWithId.id);
//       if (existing) {
//         return prev.map(item =>
//           item.id === dishWithId.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       } else {
//         return [...prev, { ...dishWithId, quantity: 1 }];
//       }
//     });
//   };

//   const updateQuantity = (id, newQty) => {
//     if (newQty < 1) {
//       removeItem(id);
//       return;
//     }

//     setCart(prev =>
//       prev.map(item =>
//         item.id === id ? { ...item, quantity: newQty } : item
//       )
//     );
//   };

//   const removeItem = (id) => {
//     setCart(prev => prev.filter(item => item.id !== id));
//   };

//   const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <div className="qsr-page">
//       {/* Navbar */}
//       <nav className="qsr-navbar">
//         <Link to="/" className="navbar-left-link">
//           <div className="navbar-left">
//             <img
//               src="../assests/food.jpg"
//               alt="Corporate Cafeteria Logo"
//               className="navbar-logo"
//             />
//             <h1 className="navbar-title">Cafe Co</h1>
//           </div>
//         </Link>
//         <button className="cart-icon" onClick={() => navigate('/cart', { state: { cart } })}>
//           🛒 {totalItems}
//         </button>
//       </nav>

//       {/* Main UI */}
//       {!selectedCity ? (
//         <div className="qsr-grid">
//           {Object.entries(cityMap).map(([city, cityRestaurants]) => (
//             <div key={city} className="qsr-card">
//               <img src={cityRestaurants[0].image} alt={city} className="qsr-image" />
//               <h3>{city.charAt(0).toUpperCase() + city.slice(1)}</h3>
//               <button className="view-btn" onClick={() => handleCitySelect(city)}>View Restaurants</button>
//             </div>
//           ))}
//         </div>
//       ) : !selectedRestaurant ? (
//         <>
//           <button className="back-btn" onClick={goBack}>⬅ Back to Cities</button>
//           <h3>Restaurants in {selectedCity}</h3>
//           <div className="qsr-grid">
//             {cityMap[selectedCity].map((rest) => (
//               <div key={rest.id} className="qsr-card">
//                 <h3>{rest.restaurant}</h3>
//                 <button className="view-btn" onClick={() => handleRestaurantSelect(rest)}>View Dishes</button>
//               </div>
//             ))}
//           </div>
//         </>
//       ) : selectedDish ? (
//         <>
//           <button className="back-btn" onClick={goBack}>⬅ Back to Dishes</button>
//           <div className="dish-card-large">
//             <img src={selectedDish.image} alt={selectedDish.name} className="dish-image-large" />
//             <h2>{selectedDish.name}</h2>
//             <p><strong>Price:</strong> ₹{selectedDish.price}</p>
//             <p><strong>Description:</strong> {selectedDish.description}</p>
//             <p><strong>Ingredients:</strong></p>
//             <ul>
//               {selectedDish.ingredients.map((ing, i) => (
//                 <li key={i}>{ing}</li>
//               ))}
//             </ul>
//             <div className="cart-controls">
//               <button onClick={() => updateQuantity(
//                 selectedRestaurant.restaurant + '_' + selectedDish.name,
//                 (cart.find(item => item.id === selectedRestaurant.restaurant + '_' + selectedDish.name)?.quantity || 1) - 1
//               )}>-</button>
//               <span role="img" aria-label="cart">🛒</span>
//               <button onClick={() => handleAddToCart(selectedDish)}>+</button>
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           <button className="back-btn" onClick={goBack}>⬅ Back to Restaurants</button>
//           <h3>Dishes at {selectedRestaurant.restaurant}</h3>
//           <div className="qsr-grid">
//             {selectedRestaurant.dishes.map((dish, index) => {
//               const dishId = selectedRestaurant.restaurant + '_' + dish.name;
//               const count = cart.find(item => item.id === dishId)?.quantity || 0;

//               return (
//                 <div key={index} className="qsr-card" onClick={() => handleDishSelect(dish)}>
//                   <img src={dish.image} alt={dish.name} className="qsr-image" />
//                   <h3>{dish.name}</h3>
//                   <p><strong>Price:</strong> ₹{dish.price}</p>
//                   <div className="cart-controls" onClick={(e) => e.stopPropagation()}>
//                     <button onClick={() => updateQuantity(dishId, count - 1)}>-</button>
//                     <span role="img" aria-label="cart">🛒</span>
//                     <button onClick={() => handleAddToCart(dish)}>+</button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }



import React, { useEffect, useState } from 'react';
import { Link, useNavigate,  useLocation } from 'react-router-dom';
import axios from 'axios';
import './QsrPage.css';

export default function QsrPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://cafecoserver.onrender.com/restaurants')
      .then(res => setRestaurants(res.data))
      .catch(err => console.error('Error loading restaurant data:', err));
  }, []);

  const location = useLocation();

useEffect(() => {
  if (location.state?.city && location.state?.restaurant && location.state?.dish) {
    setSelectedCity(location.state.city);
    setSelectedRestaurant(location.state.restaurant);
    setSelectedDish(location.state.dish);
  }
}, [location.state]);


  const cityMap = restaurants.reduce((acc, rest) => {
    if (!acc[rest.city]) acc[rest.city] = [];
    acc[rest.city].push(rest);
    return acc;
  }, {});

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectedRestaurant(null);
    setSelectedDish(null);
  };

  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setSelectedDish(null);
  };

  const handleDishSelect = (dish) => {
    setSelectedDish(dish);
  };

  const goBack = () => {
    if (selectedDish) {
      setSelectedDish(null);
    } else if (selectedRestaurant) {
      setSelectedRestaurant(null);
    } else {
      setSelectedCity(null);
    }
  };

  const handleAddToCart = (dish) => {
    const dishWithId = {
      ...dish,
      id: selectedRestaurant.restaurant + '_' + dish.name,
    };

    setCart(prev => {
      const existing = prev.find(item => item.id === dishWithId.id);
      if (existing) {
        return prev.map(item =>
          item.id === dishWithId.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...dishWithId, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) {
      removeItem(id);
      return;
    }


    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="qsr-page">
      {/* Navbar */}
      <nav className="qsr-navbar">
        <Link to="/" className="navbar-left-link">
          <div className="navbar-left">
            <img
              src="../assests/food.jpg"
              alt="Corporate Cafeteria Logo"
              className="navbar-logo"
            />
            <h1 className="navbar-title">Cafe Co</h1>
          </div>
        </Link>
        <button className="cart-icon" onClick={() => navigate('/cart', { state: { cart } })}>
          🛒 {totalItems}
        </button>
      </nav>

      {/* Main UI */}
      {!selectedCity ? (
        <div className="qsr-grid">
          {Object.entries(cityMap).map(([city, cityRestaurants]) => (
            <div key={city} className="qsr-card">
              <img src={cityRestaurants[0].image} alt={city} className="qsr-image" />
              <h3>{city.charAt(0).toUpperCase() + city.slice(1)}</h3>
              <button className="view-btn" onClick={() => handleCitySelect(city)}>View Restaurants</button>
            </div>
          ))}
        </div>
      ) : !selectedRestaurant ? (
        <>
          <button className="back-btn" onClick={goBack}>⬅ Back to Cities</button>
          <h3>Restaurants in {selectedCity}</h3>
          <div className="qsr-grid">
            {cityMap[selectedCity].map((rest) => (
              <div key={rest.id} className="qsr-card">
                <h3>{rest.restaurant}</h3>
                <button className="view-btn" onClick={() => handleRestaurantSelect(rest)}>View Dishes</button>
              </div>
            ))}
          </div>
        </>
      ) : selectedDish ? (
        <>
          <button className="back-btn" onClick={goBack}>⬅ Back to Dishes</button>
          <div className="dish-card-large">
            <img src={selectedDish.image} alt={selectedDish.name} className="dish-image-large" />
            <h2>{selectedDish.name}</h2>
            <p><strong>Price:</strong> ₹{selectedDish.price}</p>
            <p><strong>Description:</strong> {selectedDish.description}</p>
            <p><strong>Ingredients:</strong></p>
            <ul>
              {selectedDish.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
            <div className="cart-controls">
              <button onClick={() => updateQuantity(
                selectedRestaurant.restaurant + '_' + selectedDish.name,
                (cart.find(item => item.id === selectedRestaurant.restaurant + '_' + selectedDish.name)?.quantity || 1) - 1
              )}>-</button>
              <span role="img" aria-label="cart">🛒</span>
              <button onClick={() => handleAddToCart(selectedDish)}>+</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <button className="back-btn" onClick={goBack}>⬅ Back to Restaurants</button>
          <h3>Dishes at {selectedRestaurant.restaurant}</h3>
          <div className="qsr-grid">
            {selectedRestaurant.dishes.map((dish, index) => {
              const dishId = selectedRestaurant.restaurant + '_' + dish.name;
              const count = cart.find(item => item.id === dishId)?.quantity || 0;

              return (
                <div key={index} className="qsr-card" onClick={() => handleDishSelect(dish)}>
                  <img src={dish.image} alt={dish.name} className="qsr-image" />
                  <h3>{dish.name}</h3>
                  <p><strong>Price:</strong> ₹{dish.price}</p>
                  <div className="cart-controls" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => updateQuantity(dishId, count - 1)}>-</button>
                    <span role="img" aria-label="cart">🛒</span>
                    <button onClick={() => handleAddToCart(dish)}>+</button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}


