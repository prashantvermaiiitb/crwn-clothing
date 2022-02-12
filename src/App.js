import React, { Component } from 'react';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpComponent from './components/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { auth } from './firebase/firebase.utils'

class App extends Component {

  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
      console.log(user);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Header currentUser={this.state.currentUser}/>
            <Routes>
              <Route exact path='/' element={<HomePage />} />
              <Route path='/shop' element={<ShopPage />} />
              <Route path='/signin' element={<SignInAndSignUpComponent />} />
            </Routes>
        </BrowserRouter>
      </div>
    );
  }

}

export default App;
