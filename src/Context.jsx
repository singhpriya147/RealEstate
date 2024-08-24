import { createContext,  useReducer } from 'react';
import Listing from './data/Listing.json';
import Property from './data/Property.json'
import { reducer } from './reducer';
// import {auth} from './firebase/firebase'
import { auth } from './firebase/firebase';
import { db } from './firebase/firebase';
import { getDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
const AppContext = createContext();
import { useEffect } from 'react';

const Context = ({ children }) => {

  const initialState = {
    data: Listing.listing,
    cart: [],
    selectedProperty: Property,
    originalData: Listing.listing,
    filter: '',
    currentUser: null,
    userLoggedIn: false,
    isEmailUser: false,
    isGoogleUser: false,
    userData: null,
    userBookmarks: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const unsubscribe =  onAuthStateChanged(auth, async(user) => {
      if (user) {

        dispatch({ type: 'SET_CURRENT_USER', payload: user });

        const isEmailUser = user.providerData.some(
          (provider) => provider.providerId === 'password'
        );

        dispatch({ type: 'SET_EMAIL_USER', payload: isEmailUser });

        const isGoogleUser = user.providerData.some(
          (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
        );

        dispatch({ type: 'SET_GOOGLE_USER', payload: isGoogleUser });

        dispatch({ type: 'SET_USER_LOGGED_IN', payload: true });

      

           try {
             const bookmarksDoc = await getDoc(
               doc(db, 'UserBookmarks', user.uid)
             );
             if (bookmarksDoc.exists()) {
               dispatch({
                 type: 'SET_USER_BOOKMARKS',
                 payload: bookmarksDoc.data().bookmarks || [],
               });
             } else {
               console.log('No bookmarks document!');
             }
           } catch (error) {
             console.error('Error fetching bookmarks: ', error);
           }








      } else {
        dispatch({ type: 'SET_CURRENT_USER', payload: null });
        dispatch({ type: 'SET_USER_LOGGED_IN', payload: false });
          dispatch({ type: 'SET_USER_BOOKMARKS', payload: [] });
      }
    });

    return () => unsubscribe();
  }, []);



  

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };
export default Context;
