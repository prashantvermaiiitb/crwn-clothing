import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpComponent from './components/sign-in-and-sign-up/sign-in-and-sign-up.component';
import './App.css';
import Checkout from './pages/checkout/checkout-component';

// https://github.com/sass/node-sass/issues/2536
//npm rebuild node-sass 

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<HomePage />} />
          <Route path='shop/*' element={<ShopPage />} />
          <Route path='signin' element={<SignInAndSignUpComponent />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
