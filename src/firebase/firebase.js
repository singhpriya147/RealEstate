import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { setDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyCcEAaVDl2F-513ASc-nZ4QSC2V7uxkkWk',

  authDomain: 'realestate-69bba.firebaseapp.com',

  projectId: 'realestate-69bba',

  storageBucket: 'realestate-69bba.appspot.com',

  messagingSenderId: '320842226821',

  appId: '1:320842226821:web:3f75c442b8a6a72f565dec',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db=getFirestore(app);
// export const appsetDoc=setDoc(app)
export { app, auth ,setDoc,doc};
