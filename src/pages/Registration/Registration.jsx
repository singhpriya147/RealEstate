import './Registration.css';
// import GoogleIcon from '../../assets/icons/icons8-google.svg';
import { setDoc } from 'firebase/firestore';

import { doc } from 'firebase/firestore';
import { AppContext} from '../../context';
import{db} from '../../firebase/firebase.js'
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth.js';
import { auth } from '../../firebase/firebase.js';
import { doSignInWithGoogle } from '../../firebase/auth.js';
// import { updateProfile } from '../../firebase/auth.js';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, Navigate } from 'react-router-dom';
// import {toast} from 'react-toastify'

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');


  const{state}=useContext(AppContext);

  const { userLoggedIn } = state;
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await doCreateUserWithEmailAndPassword(email, password);
      const user=auth.currentUser;
      console.log("user register",user);
      if(user){
       await setDoc(doc(db,"Users",user.uid),{
        email:user.email,
        userName:username,
       });
       console.log("user saved in db succesfully")
      }
      console.log("user register succesfully")
      navigate('/login');
    } catch (error) {
      console.log(error.message);
    } finally {
      setUsername('');
      setEmail('');
      setPassword('');
    }
  };

  const registerWithGoogle = async () => {
    try {
      await doSignInWithGoogle(email, password);
      navigate('/postlogin');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={'/'} replace={true} />}

      <div className='registration-wrapper'>
        <div className='regis-header'>
          <h2>Create your New acccount</h2>
          <p>Create an account to start looking for the food you like</p>
          <form onSubmit={onSubmit}>
            <label htmlFor='email'>Email Address</label>
            <input
              id='email'
              type='email'
              placeholder='johndoe@gmail.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor='username'>User Name</label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name=''
              id='password'
              // disabled={isRegistering}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='Term-condition'>
              <input type='checkbox' name='' id='check' />
              <p>
                I Agree with <a>Term of services</a>and <a>Privacy policy</a>
              </p>
            </div>

            {/* {errorMessage && (
              <span className='text-red-600 font-bold'>{errorMessage}</span>
            )} */}

            <button type='subit'>Register</button>
          </form>
          <div className='registration-footer'>
            <div className='hr-lines'>
              <span>Or sign in with</span>
            </div>
            <div className='footer-base'>
              {/* <GoogleIcon width='25' height='25' onClick={registerWithGoogle} /> */}
              <p>
                Have an Account ? <Link to={'/login'}>Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
