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

const promise = loadStripe(
  'pk_test_51Hsjo8CiY9aT1d2SXA9gTNRjABNMncgwWwnmhBBgZQaiRxkxfEvk5rWkOlWmD9zZSeIqTmQPEK4BFYxY4hpxB3Ug00h3gHGaAY'
)

function App() {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useStateValue();

  const getUserProfile = async (userUID) => {
    const userProfile = await db.collection('users').doc(userUID).get()
    return userProfile.data()
  }

  const getUserBasket = async (userUID) => {
    const userBasket = await db.collection('users').doc(userUID).collection('basket').doc(userUID).get()
    return userBasket.data()
  }

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {

      const getProfileData = async (authUser) => {
        const profileData = await getUserProfile(authUser.uid)
        const basketData = await getUserBasket(authUser.uid)
        return {profileData, basketData};
      } 

      getProfileData(authUser).then(data => {
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
        });
      }
    });
  }, [dispatch]);


  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/createaccount">
            <CreateAccount/>
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
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
