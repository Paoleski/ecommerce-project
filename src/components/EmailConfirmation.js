import React, {useState} from 'react';
import '../styles/emailConfirmation.css';
import logo from '../img/LOGO-AGOEFILO.PNG';
import { auth } from '../firebase';
import { useStateValue } from './StateProvider';
import { useHistory } from 'react-router-dom';

function EmailConfirmation() {
  const [{user}, dispatch] = useStateValue()
  const [emailState, setEmailState] = useState(false);
  const history = useHistory()

  const sendEmailConfirmation = () => {
    if ((user) && (!emailState)) {
      auth.currentUser
        .sendEmailVerification({ url: 'http://localhost:3000/' }) //NEED TO CHANGE FOR PRODUCTION
        .then(function () {
          console.log('sent email');
          setEmailState(true);
        })
        .catch(function (error) {
          console.log('could not send email');
        });
    }
  };

  return (
    <div className="emailConfirmation">
      <img onClick={() => history.push('/')} className="emailConfirmation__logo" src={logo} alt=""></img>
      <div className="emailConfirmation__container">
        <p>
          We've already sent you a email: Check you emails (spam folder included) for a
          confirmation email or request another confirmation email.
        </p>
        {emailState && <p style={{textAlign:'center', marginTop:3}}>Email sent!</p>}

        <button  disabled={emailState} type="button" onClick={sendEmailConfirmation}>Send verification email</button>
      </div>
    </div>
  );
}

export default EmailConfirmation;
