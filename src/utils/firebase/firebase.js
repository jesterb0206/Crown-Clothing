import {initializeApp} from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD_3qqXh4SOfO_uQdDdhgLR5-Y7bx-ZC34',
  authDomain: 'crown-clothing-db-fb528.firebaseapp.com',
  projectId: 'crown-clothing-db-fb528',
  storageBucket: 'crown-clothing-db-fb528.appspot.com',
  messagingSenderId: '232222482057',
  appId: '1:232222482057:web:6b30d6dae31f1329153058',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
