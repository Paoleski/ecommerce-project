import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../firebase'
import logo from '../img/LOGO-AGOEFILO.PNG'
import '../styles/login.css'

function Login() {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = (e) => {
        e.preventDefault()

        auth
            .signInWithEmailAndPassword(email, password)
            .then((auth) => {
                history.push('/')
            })
            .catch(error => alert(error.message))
        //firebase login
    }
    
    return (
        <div className='login'>
            <Link to="/">
                <img className="login__logo" src={logo} alt=""></img>
            </Link>

            <div className="login__container">
                <form onSubmit={signIn}>
                    <h1>Sign-in</h1>
                    
                    <h5>Email</h5>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>

                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>

                    <button type="submit" className="login__signInButton">Sign in</button>
                </form>

                <p>By signing-in you agree to the Paoleski Abortion Clinics Operatives & Deixe Seu Feto Feliz - tm</p>

                {/* <button onClick={(e) => history.push('/createaccount')} className="login__registerButton">Create your account</button>
                 */}
                 <button onClick={() => history.push('/createaccount')} className="login__registerButton"> create account</button>
            </div>
        </div>
    )
}

export default Login
