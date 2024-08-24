import './Login.css';
// import GoogleIcon from '../assets/icons/icons8-google.svg?react';

import { useState } from 'react';

import { doSignInWithEmailAndPassword } from '../../firebase/auth';
import { doSignInWithGoogle } from '../../firebase/auth';

import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await doSignInWithEmailAndPassword(email, password);
      console.log('user logged in ');
      navigate('/home');
    } catch (error) {
      console.log(error.message);
    } finally {
      setEmail('');
      setPassword('');
    }
  };

  const signInWithGoogle = async () => {
    try {
      await doSignInWithGoogle(email, password);
      navigate('/postlogin');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='login-wrapper'>
      <div className='login-header'>
        <h2>Login to your acccount</h2>
        <p>Please sign in to your account</p>
        <form onSubmit={onSubmit}>
          <label htmlFor='email'>Email Address</label>
          <input
            id='email'
            type='email'
            placeholder='johndoe@gmail.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit'>Login</button>
        </form>
        <div className='login-footer'>
          <div className='hr-lines'>
            <span>Or sign in with</span>
          </div>
          <div className='footer-base'>
            {/* <GoogleIcon width='25' height='25' onClick={signInWithGoogle} /> */}
            <p>
              Don't have an Account? <Link to='/registration'>Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
