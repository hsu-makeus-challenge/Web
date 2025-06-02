import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './page/navbar';
import Cart from './page/cart';
import cartItems from './constant/cartitems';
import { useCartStore } from './store/store';

const App: React.FC = () => {
  const { cartItems: currentCart, addToCart } = useCartStore();

  useEffect(() => {
    if (currentCart.length === 0) {
      cartItems.forEach(item => addToCart(item));
    }
  }, );

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Cart />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
