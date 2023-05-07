import React, { Component } from 'react';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpComponent from './components/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { getDoc } from 'firebase/firestore';
import { UserContext } from './components/context/user.context';

class App extends Component {
  static contextType = UserContext
  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // this.setState({ currentUser: user });
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          // console.log("🚀 ~ file: App.js ~ line 32 ~ App ~ componentDidMount ~ docSnap", docSnap)
          const user = docSnap.data();
          // console.log("🚀 ~ file: App.js ~ line 33 ~ App ~ componentDidMount ~ user ", user);
          this.setState({
            currentUser: {
              id: docSnap.id,
              ...user
            }
          }, () => console.log('setting the user and printing this ', this.state))

        } else {
          console.log('Data does not exist here ..');
          this.setState({ currentUser: userAuth }, () => console.log('there is no data in firebase that has logged in ...'));
        }
      }
      else {
        //todo : have put this in else though not in tutorials
        // this.setState({ currentUser: userAuth });
        this.setState({ currentUser: userAuth }, () => console.log('there is no user that has logged in ...'));
      }
      const { setCurrentUser } = this.context;
      setCurrentUser(this.state.currentUser);

    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path='/' element={<Header currentUser={this.state.currentUser} />}>
            <Route index element={<HomePage />} />
            <Route path='shop' element={<ShopPage />} />
            <Route path='signin' element={<SignInAndSignUpComponent />} />
          </Route>
        </Routes>
      </div>
    );
  }

}

export default App;
