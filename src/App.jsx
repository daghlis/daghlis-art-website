import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import './App.css';

function App() {
  const { i18n } = useTranslation();
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Check if current URL is admin
  useEffect(() => {
    const path = window.location.pathname;
    setIsAdmin(path === '/admin' || path.startsWith('/admin'));
  }, []);

  // Handle admin login
  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
  };

  // Handle admin logout
  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    window.location.href = '/';
  };

  const addToCart = (artwork) => {
    const existingItem = cartItems.find(item => item.id === artwork.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === artwork.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...artwork, quantity: 1 }]);
    }
  };

  const removeFromCart = (artworkId) => {
    setCartItems(cartItems.filter(item => item.id !== artworkId));
  };

  const updateQuantity = (artworkId, quantity) => {
    if (quantity === 0) {
      removeFromCart(artworkId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === artworkId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Admin Panel Routes
  if (isAdmin) {
    if (!isAdminLoggedIn) {
      return <AdminLogin onLogin={handleAdminLogin} />;
    }
    return <AdminPanel onLogout={handleAdminLogout} />;
  }

  // Main Website
  return (
    <div className={`App ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <Header 
        cartItemsCount={getTotalItems()}
        onCartClick={() => setShowCart(true)}
      />
      
      <main>
        <Hero />
        <Gallery onAddToCart={addToCart} />
        <About />
        <Contact />
      </main>
      
      <Footer />
      
      {showCart && (
        <Cart
          items={cartItems}
          onClose={() => setShowCart(false)}
          onRemoveItem={removeFromCart}
          onUpdateQuantity={updateQuantity}
          totalPrice={getTotalPrice()}
        />
      )}
    </div>
  );
}

export default App;

