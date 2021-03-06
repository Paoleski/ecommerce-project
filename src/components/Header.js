/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import '../styles/header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../img/LOGO-AGOEFILO.PNG';
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from '../firebase';
import BurgerMenu from './BurgerMenu';


function Header() {
  const [{basket, user}, dispatch] = useStateValue()
  const history = useHistory()

  const handleAuthentication = () => {
    if (user) {
      auth.signOut()
    }
  }

  const openMenu = () => {
    dispatch({
      type:'SET_MENU',
      menu:true
    })
  }

  const handleKeyWord = (e) => {
    dispatch({
      type:'SET_KEYWORD',
      keyword:e.target.value
    })
  }
  
  return (
    <div className="header">
          <img onClick={e => history.push('/')} className="header__logo" src={logo} alt="s" />
      <div className="header__search">
        <input className="header__searchInput" type="text" onChange={handleKeyWord}/>
        <SearchIcon className="header__searchIcon"></SearchIcon>
      </div>
      
      <div className="header__nav">
        <Link to={!user ? '/login' : '/'}>
            <div onClick={handleAuthentication} className="header__option header__userGreetings">
              {/* can't get displayName on first login/creating */}
              <span className="header__optionLineOne ">Hello {user ?  user?.displayName || user?.email : 'Guest'}</span> 
              <span className="header__optionLineTwo">{user ? 'Sign out' : 'Sign in' }</span>
            </div>
        </Link>

        <Link to='/orders'>
            <div className="header__option header__userGreetings">
              <span className="header__optionLineOne ">Returns &</span>
              <span className="header__optionLineTwo">Orders</span>
            </div>
        </Link>

        <Link to="/checkout">
            <div className="header__optionBasket">
                <ShoppingBasketIcon/>
                {/* basket?.length the interrogation marks handle errors graciously */}
                <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
            </div>
        </Link>

        <div className="header__optionMenu">
           <MenuIcon onClick={openMenu}/>
           <BurgerMenu/>
        </div>
      </div>
    </div>
  );
}

export default Header;
