import React, { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Suspense } from 'react';
import { useDispatch } from 'react-redux';

import { createUserProfileDocument, onAuthenticationStatusChange } from './firebase/firebase.utils';
import { GlobalStyle } from './global.styles';
import { setCurrentUser } from './store/user/user.action';

/**
 * lazy loading the components
 */
const Header = lazy(() => import('./components/header/header.component'));
const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignInAndSignUpComponent = lazy(() => import('./components/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const Checkout = lazy(() => import('./pages/checkout/checkout-component'));

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
      // console.log("🚀 ~ file: user.context.jsx:28 ~ unsubscribe ~ user:", user)
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, [dispatch]);




  return (
    <Suspense fallback={() => { return (<p>Loading....</p>) }}>
      <div className="App">
        <GlobalStyle />
        <Routes>
          <Route path='/' element={<Header />}>
            <Route index element={<HomePage />} />
            <Route path='shop/*' element={<ShopPage />} />
            <Route path='signin' element={<SignInAndSignUpComponent />} />
            <Route path='checkout' element={<Checkout />} />
          </Route>
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
