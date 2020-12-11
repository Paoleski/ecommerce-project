import Header from './components/Header';
import './styles/App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './components/Checkout';
import Login from './components/Login';
import React, { useEffect } from 'react';
import { auth, db } from './firebase';
import { useStateValue } from './components/StateProvider';
import Payment from './components/Payment';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Orders from './components/Orders';
import CreateAccount from './components/CreateAccount';
import FullscreenImg from './components/FullscreenImg';
import Shipping from './components/Shipping';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
function App() {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useStateValue();

  const getUserProfile = async (userUID) => {
    const userProfile = await db.collection('users').doc(userUID).collection('profile').doc(userUID).get()
    return userProfile.data()
  }

  const getUserBasket = async (userUID) => {
    const userBasket = await db.collection('users').doc(userUID).collection('basket').doc(userUID).get()
    return userBasket.data()
  }

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
      authUser.getIdTokenResult().then(idTokenResult => {
        authUser.admin = idTokenResult.claims.admin
      })
      const getProfileData = async (authUser) => {
        const profileData = await getUserProfile(authUser.uid)
        const basketData = await getUserBasket(authUser.uid)
        return {profileData, basketData};
      } 

      getProfileData(authUser).then(data => {
        console.log(data)
        dispatch({
          type: 'SET_USER',
          user: authUser,
          profile:data.profileData,
          basket: !data.basketData.basket ? [] : [...data.basketData.basket]
        });
      })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null,
          basket:[]
        });
      }
    });
  }, [dispatch]);

  console.log(state)

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/createaccount">
            <CreateAccount/>
          </Route>
          <Route path="/adminpanel">
            <Header/>
            <AdminPanel/>
          </Route>
          <Route path="/shipping">
            <Shipping/>
          </Route>
          <Route path="/fullscreenimg">
            <FullscreenImg/>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
            <Footer/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
