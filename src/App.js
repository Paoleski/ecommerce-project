import Header from './components/Header'
import './styles/App.css'
import Home from './components/Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Checkout from './components/Checkout'
import Login from './components/Login'
import React, { useEffect } from 'react'
import { auth } from './firebase'
import { useStateValue } from './components/StateProvider'

function App() {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('the user is >>>', authUser)

      if (authUser) {
        //the user just logged in / was already logged
        dispatch({
          type:'SET_USER',
          user:authUser
        })
      } else {
        // the user is logged out
          dispatch({
            type:'SET_USER',
            user:null
          })
      }
    })
  }, [dispatch])
  
  return (  
    <Router>
      <div className="app">
        <Switch>
        <Route path="/login">
              <Login/>
          </Route>
          <Route path="/checkout">
              <Header/>
              <Checkout/>
          </Route>
          <Route path="/">
            <Header/>
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
