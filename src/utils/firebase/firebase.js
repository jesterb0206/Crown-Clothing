import {initializeApp} from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD_3qqXh4SOfO_uQdDdhgLR5-Y7bx-ZC34',
  authDomain: 'crown-clothing-db-fb528.firebaseapp.com',
  projectId: 'crown-clothing-db-fb528',
  storageBucket: 'crown-clothing-db-fb528.appspot.com',
  messagingSenderId: '232222482057',
  appId: '1:232222482057:web:6b30d6dae31f1329153058',
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('An error creating the user occurred!', error.message);
    }
  }

  return userDocRef;
};
