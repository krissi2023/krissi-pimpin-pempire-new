import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './App.css';

// Pages
import Home from './pages/Home';
import ComicStore from './pages/ComicStore';
import Arcade from './pages/Arcade';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import DailyBonus from './pages/DailyBonus';
import GraphicsDemo from './pages/GraphicsDemo';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Initialize Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/comics" element={<ComicStore />} />
              <Route path="/arcade" element={<Arcade />} />
              <Route path="/daily-bonus" element={<DailyBonus />} />
              <Route path="/graphics-demo" element={<GraphicsDemo />} />
              <Route path="/checkout/:comicId" element={<Checkout />} />
              <Route path="/success" element={<Success />} />
              <Route path="/cancel" element={<Cancel />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Elements>
  );
}

export default App;
