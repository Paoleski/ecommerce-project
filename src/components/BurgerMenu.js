import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import logo from '../img/LOGO-AGOEFILO.PNG';
import { auth } from '../firebase'
import '../styles/burgerMenu.css'
import { useStateValue } from './StateProvider'

function BurgerMenu() {
    const [{user, menu}, dispatch] = useStateValue()
    const history = useHistory()
    const style = { visibility: menu ? 'visible' : 'hidden' }
   

    const OVERLAY_STYLES = {
        visibility: menu ? 'visible' : 'hidden',
        position:'fixed',
        top:0,
        left:0,
        right:0,
        bottom:0,
        backgroundColor:'rgba(0,0,0, .7)',
    }

    const closeMenu = () => {
        dispatch({
            type:'SET_MENU',
            menu:false
        })
    }

    const handleAuthentication = () => {
        if (user) {
          auth.signOut()
        }
      }

    return (
        <div onClick={closeMenu} style={OVERLAY_STYLES} className="burgerMenu__container">
                <div style={style} className="burgerMenu">
                    <div className="burgerMenu__list">
                        <div className="burgerMenu__logoImg">
                            <img src={logo} alt="logo" style={{width:'100%', height:100, objectFit:'contain', marginBottom:20}}/>
                        </div>
                        <div>
                            <button onClick={e => history.push('/')} className="burgerMenu__button">Home</button>
                        </div>
                        <div>
                            <button onClick={e => history.push('/checkout')} className="burgerMenu__button">Cart/Basket</button>
                        </div>
                        <div>
                            <button onClick={e => history.push('/orders')} className="burgerMenu__button">Orders</button>
                        </div>
                        <Link to={user ? '/' : '/login'}>
                            <button className="burgerMenu__button" onClick={handleAuthentication}>{user ? 'Sign Out' : 'Sign in' }</button>
                        </Link>
                    </div>
                </div>
            </div>
    )
}

export default BurgerMenu
