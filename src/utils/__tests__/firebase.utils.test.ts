import firestoreAuth from 'firebase/auth';
import {
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from '../firebase/firebase.utils';

jest.mock('firebase/auth', () => {
  return {
    getAuth: jest.fn(),
    GoogleAuthProvider: jest.fn().mockImplementation(() => {
      return {
        setCustomParameters: jest.fn(),
      };
    }),
    signInWithPopup: jest.fn(),
    signInWithRedirect: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    onAuthStateChanged: jest.fn(),
    signOut: jest.fn(),
  };
});

describe('Firebase Utils', () => {
  test("signInWithGooglePopup to Call firestoreAuth's signInWithPopup", () => {
    signInWithGooglePopup();
    expect(firestoreAuth.signInWithPopup).toHaveBeenCalled();
  });

  test("signInWithGoogleRedirect to Call firestoreAuth's signInWithRedirect", () => {
    signInWithGoogleRedirect();
    expect(firestoreAuth.signInWithRedirect).toHaveBeenCalled();
  });

  test("signInAuthUserWithEmailAndPassword to Call firestoreAuth's signInWithEmailAndPassword", () => {
    const testEmail = 'testEmail',
      testPassword = 'testPassword';
    signInAuthUserWithEmailAndPassword(testEmail, testPassword);

    expect(firestoreAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
      undefined,
      testEmail,
      testPassword
    );
  });

  test("createAuthUserWithEmailAndPassword to Call firestoreAuth's createUserWithEmailAndPassword", () => {
    const testEmail = 'testEmail',
      testPassword = 'testPassword';
    createAuthUserWithEmailAndPassword(testEmail, testPassword);

    expect(firestoreAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
      undefined,
      testEmail,
      testPassword
    );
  });

  test("signOutUser to Call firestoreAuth's signOut", () => {
    signOutUser();
    expect(firestoreAuth.signOut).toHaveBeenCalled();
  });
});
