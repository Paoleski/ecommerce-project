import React, { useState } from 'react';
import '../styles/createAccount.css';
import logo from '../img/LOGO-AGOEFILO.PNG';
import { useHistory } from 'react-router-dom';
import { db, auth } from '../firebase';
import { Controller, useForm } from 'react-hook-form';
import { useStateValue } from './StateProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function CreateAccount() {
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useStateValue();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [street, setStreet] = useState('');
  const [stateUF, setStateUF] = useState('');
  const [city, setCity] = useState('');

  const schema = yup.object().shape({
    email: yup.string().email().required('required'),
    password: yup.string().min(8).required('required'),
    name: yup.string().required('required'),
    number: yup.string().min(9).required('required'),
    street: yup.string().required('required'),
    zip: yup
      .string()
      .matches(/^(?=(\D*\d){5}\D*$)/, 'must be a valid zip code'),
    city: yup.string().required('required'),
    state: yup
      .string()
      .matches(/^[a-zA-z]+$/, 'required')
      .min(2)
      .max(2),
  });

  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleAccountCreation = (e) => {
    console.log(e)
    const profile = {
      fullName,
      email,
      street,
      zipCode,
      city,
      stateUF,
      phoneNumber,
    };
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        if (authUser) {
          const displayName = fullName.split(' ')[0];
          auth.currentUser.updateProfile({ displayName });
          dispatch({
            type: 'CREATE_USER',
            user: authUser,
            profile: profile,
            basket: [],
          });
        }
      })
      .then(() => {
        db.collection('users')
          .doc(auth.currentUser.uid)
          .collection('profile')
          .doc(auth.currentUser.uid)
          .set({
            fullName,
            email,
            street,
            zipCode,
            city,
            stateUF,
            phoneNumber,
          });

        db.collection('users')
          .doc(auth.currentUser.uid)
          .collection('basket')
          .doc(auth.currentUser.uid)
          .set({ basket: [] });
        history.push('/');
      })
      .catch((error) => alert(error.message));
  };

  console.log(errors);

  return (
    <div className="createAccount">
      <img
        onClick={() => history.push('/')}
        className="createAccount__logo"
        src={logo}
        alt=""
      ></img>
      <div className="createAccount__container">
        <form onSubmit={handleSubmit(handleAccountCreation)}>
          <h1>Create account</h1>

          <h5>Email</h5>
          <Controller
            render={() => (
              <input
                type="text"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                ref={register}
              />
            )}
            defaultValue="type your email"
            name="emailField"
            control={control}
          />

          <div className="createAccount__errors">
            {errors && errors.email?.message}
          </div>

          <h5>Password</h5>
          <Controller
            render={() => (
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                ref={register}
              />
            )}
            defaultValue=""
            name="passwordField"
            control={control}
          />

          <div className="createAccount__errors">
            {errors && errors.password?.message}
          </div>

          <h5>Full name</h5>
          <Controller
            render={() => (
              <input
                type="text"
                name="name"
                onChange={(e) => setFullName(e.target.value)}
                ref={register}
              />
            )}
            defaultValue=""
            name="nameField"
            control={control}
          />

          <div className="createAccount__errors">
            {errors && errors.name?.message}
          </div>

          <h5>Phone number</h5>
          <Controller
            render={() => (
              <input
                type="text"
                name="number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                ref={register}
              />
            )}
            defaultValue=""
            name="numberField"
            control={control}
          />
          <div className="createAccount__errors">
            {errors && errors.number?.message}
          </div>

          <h5>Street</h5>
          <Controller
            render={() => (
              <input
                type="text"
                name="street"
                onChange={(e) => setStreet(e.target.value)}
                ref={register}
              />
            )}
            defaultValue=""
            name="streetField"
            control={control}
          />
          <div className="createAccount__errors">
            {errors && errors.street?.message}
          </div>

          <div className="createAccount__address">
            <div className="createAccount__zipCode">
              <h5>Zip Code</h5>
              <Controller
                render={() => (
                  <input
                    className="createAccount__zipCodeInput"
                    type="text"
                    name="zip"
                    onChange={(e) => setZipCode(e.target.value)}
                    ref={register}
                  />
                )}
                defaultValue=""
                name="zipField"
                control={control}
              />
              <div className="createAccount__errors">
                {errors && errors.zip?.message}
              </div>
            </div>
            <div className="createAccount__city">
              <h5>City</h5>
              <Controller
                render={() => (
                  <input
                    className="createAccount__cityInput"
                    type="text"
                    name="city"
                    onChange={(e) => setCity(e.target.value)}
                    ref={register}
                  />
                )}
                defaultValue=""
                name="cityField"
                control={control}
              />
              <div className="createAccount__errors">
                {errors && errors.city?.message}
              </div>
            </div>
            <div className="createAccount__state">
              <h5>State</h5>
              <Controller
                render={() => (
                  <input
                    className="createAccount__stateInput"
                    type="text"
                    name="state"
                    onChange={(e) => setStateUF(e.target.value)}
                    ref={register}
                  />
                )}
                defaultValue=""
                name="stateField"
                control={control}
              />
              <div className="createAccount__errors">
                {errors && errors.state?.message}
              </div>
            </div>
          </div>
          <button type="submit" className="createAccount__registerButton">
            <strong>Create your account</strong>
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
