import React, { useState } from 'react';
import '../styles/createAccount.css';
import logo from '../img/LOGO-AGOEFILO.PNG';
import { useHistory } from 'react-router-dom';
import { db, auth } from '../firebase';
import { useStateValue } from './StateProvider';

function CreateAccount() {
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useStateValue()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [stateUF, setStateUF] = useState('');
  const [city, setCity] = useState('');

  const handleAccountCreation = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        if (authUser) {
          const displayName = fullName.split(' ')[0];
          auth.currentUser.updateProfile({ displayName });
          dispatch({
            type: 'SET_USER',
            user: authUser,
            profile:fullName
          });
        }
      })
      .then(() => {
        db.collection('users')
          .doc(auth.currentUser.uid)
          .set({ fullName, address, zipCode, city, stateUF });
        history.push('/');
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="createAccount">
      <img
        onClick={(e) => history.push('/')}
        className="createAccount__logo"
        src={logo}
        alt=""
      ></img>
      <div className="createAccount__container">
        <form onSubmit={handleAccountCreation}>
          <h1>Create account</h1>

          <h5>Email</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <h5>Full name</h5>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <div className="createAccount__address">
            <div className="createAccount__addressInput">
              <h5>Address</h5>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="createAccount__zipCode">
              <h5>Zip Code</h5>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>

            <div className="createAccount__city">
              <h5>City</h5>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="createAccount__state">
              <h5>State</h5>
              <input
                type="text"
                value={stateUF}
                onChange={(e) => setStateUF(e.target.value)}
              />
            </div>
          </div>

          <p>
            By signing-in you agree to the Paoleski Abortion Clinics Operatives
            & Deixe Seu Feto Feliz - tm
          </p>

          <button type="submit" className="createAccount__registerButton">
            Create your account
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
