import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpComponent from './components/sign-in-and-sign-up/sign-in-and-sign-up.component';
import './App.css';
import Checkout from './pages/checkout/checkout-component';
import { createUserProfileDocument, onAuthenticationStatusChange } from './firebase/firebase.utils';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './store/user/user.action';

// https://github.com/sass/node-sass/issues/2536
//npm rebuild node-sass 

const App = () => {
  // todo this object will never change even after that also we have to pass this in [] in useEffect 
  // todo to avoid linkting error, there will not be any re-rendering
  // todo there will only be single dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthenticationStatusChange((user) => {
      if (user) {
        createUserProfileDocument(user);
      }
      // we will be getting either user object or null 
      console.log("🚀 ~ file: user.context.jsx:28 ~ unsubscribe ~ user:", user)
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, [dispatch]);

  


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
