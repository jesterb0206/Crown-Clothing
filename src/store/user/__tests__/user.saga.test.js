import {call} from 'typed-redux-saga/macro';
import {expectSaga, testSaga} from 'redux-saga-test-plan';
import {throwError} from 'redux-saga-test-plan/providers';
import {
  userSagas,
  onSignOutStart,
  onSignUpStart,
  onSignUpSuccess,
  onEmailSignInStart,
  onCheckUserSession,
  onSignInStart,
  onGoogleSignInStart,
  onSignInSuccess,
  onSignInFailure,
  onSignOutFailure,
  onSignOutSuccess,
  onSignUpFailure,
  signOut,
  signUp,
  signIn,
  signInWithEmail,
  signInWithGoogle,
  isUserAuthenticated,
  signInAfterSignUp,
  getSnapshotFromUserAuth,
} from '../user.saga';
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from '../../../utils/firebase/firebase.utils';
import {USER_ACTION_TYPES} from '../user.types';
import {
  signOutFailed,
  signOutSuccess,
  signUpSuccess,
  signUpFailed,
  signInFailed,
  signInSuccess,
} from '../user.action';

describe('User Sagas', () => {
  test('userSagas', () => {
    testSaga(userSagas)
      .next()
      .all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart),
      ])
      .next()
      .isDone();
  });

  test('onGoogleSignInStart Saga Should takeLatest GOOGLE_SIGN_IN_START and Call signInWithGoogle', () => {
    testSaga(onGoogleSignInStart)
      .next()
      .takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
      .next()
      .isDone();
  });

  test('onCheckUserSession Saga Should takeLatest CHECK_USER_SESSION and Call isUserAuthenticated', () => {
    testSaga(onCheckUserSession)
      .next()
      .takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
      .next()
      .isDone();
  });

  test('onEmailSignInStart Saga Should takeLatest EMAIL_SIGN_IN_START and Call signInWithEmail', () => {
    testSaga(onEmailSignInStart)
      .next()
      .takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
      .next()
      .isDone();
  });

  test('onSignUpStart Saga Should takeLatest SIGN_UP_START and Call signUp', () => {
    testSaga(onSignUpStart)
      .next()
      .takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
      .next()
      .isDone();
  });

  test('onSignUpSuccess Saga Should takeLatest SIGN_UP_SUCCESS and Call signInAfterSignUp', () => {
    testSaga(onSignUpSuccess)
      .next()
      .takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
      .next()
      .isDone();
  });

  test('onSignOutStart Saga Should takeLatest SIGN_OUT_START and Call signOut', () => {
    testSaga(onSignOutStart)
      .next()
      .takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
      .next()
      .isDone();
  });

  test('signInAfterSignUp Saga Should Call getSnapshotFromUserAuth and signIn', () => {
    const mockUser = {id: 1, name: 'test'};
    const mockAdditionalDetails = {displayName: 'test'};
    const mockPayload = {
      user: mockUser,
      additionalDetails: mockAdditionalDetails,
    };

    testSaga(signInAfterSignUp, {
      payload: mockPayload,
    })
      .next()
      .call(getSnapshotFromUserAuth, mockUser, mockAdditionalDetails)
      .next()
      .isDone();
  });

  test('signOut Saga Success Path Should Call signOutUser and Put signOutSuccess if Successful', () => {
    return expectSaga(signOut)
      .provide([[call(signOutUser)]])
      .put(signOutSuccess())
      .run();
  });

  test('signOut Saga Error Path Should Call signOutUser and Put signOutFailed if Failed', () => {
    const error = new Error('test Error');

    return expectSaga(signOut)
      .provide([[call(signOutUser), throwError(error)]])
      .put(signOutFailed(error))
      .run();
  });

  test('signUp Saga Success Path Should Call signInAfterSignUp and Put signUpSuccess if Successful', () => {
    const mockEmail = 'test@test';
    const mockPassword = 'test1234';
    const mockDisplayName = 'test';
    const mockUser = {displayName: mockDisplayName, email: mockEmail};
    const mockUserCredential = {id: 1, user: mockUser};

    const mockPayload = {
      email: mockEmail,
      password: mockPassword,
      displayName: mockDisplayName,
    };

    return expectSaga(signUp, {payload: mockPayload})
      .provide([
        [
          call(createAuthUserWithEmailAndPassword, mockEmail, mockPassword),
          mockUserCredential,
        ],
      ])
      .put(
        signUpSuccess(mockUserCredential.user, {displayName: mockDisplayName})
      )
      .run();
  });

  test('signUp Saga Error Path Should Call createAuthUserWithEmailAndPassword and Put signUpFailure if Failed', () => {
    const mockEmail = 'test@test';
    const mockPassword = 'test1234';
    const mockError = new Error('test Error');

    return expectSaga(signUp, {
      payload: {email: mockEmail, password: mockPassword},
    })
      .provide([
        [
          call(createAuthUserWithEmailAndPassword, mockEmail, mockPassword),
          throwError(mockError),
        ],
      ])
      .put(signUpFailed(mockError))
      .run();
  });

  test('isUserAuthenticated Saga Success Path Should Call getSnapshotFromUserAuth and signIn if Successful', () => {
    const mockUserAuth = {id: 1, name: 'test'};

    return expectSaga(isUserAuthenticated)
      .provide([[call(getCurrentUser), mockUserAuth]])
      .call(getSnapshotFromUserAuth, mockUserAuth)
      .run();
  });

  test('isUserAuthenticated Saga Error Path Should Call getCurrentUser and Put signInFailed if Failed', () => {
    const mockError = new Error('test Error');

    return expectSaga(isUserAuthenticated)
      .provide([[call(getCurrentUser), throwError(mockError)]])
      .put(signInFailed(mockError))
      .run();
  });

  test('signInWithEmail Saga Success Path Should Call signInAuthUserWithEmailAndPassword and Call getSnapshotFromUserAuth', () => {
    const mockEmail = 'test@test';
    const mockPassword = 'test1234';
    const mockUser = {id: 1, name: 'test', email: mockEmail};
    const mockUserCredential = {id: 1, user: mockUser};

    return expectSaga(signInWithEmail, {
      payload: {email: mockEmail, password: mockPassword},
    })
      .provide([
        [
          call(signInAuthUserWithEmailAndPassword, mockEmail, mockPassword),
          mockUserCredential,
        ],
      ])
      .call(getSnapshotFromUserAuth, mockUser)
      .run();
  });

  test('signInWithEmail Saga Error Path Should Call signInAuthUserWithEmailAndPassword and Put signInFailed on Error', () => {
    const mockEmail = 'test@test';
    const mockPassword = 'test1234';
    const mockError = new Error('test Error');

    return expectSaga(signInWithEmail, {
      payload: {email: mockEmail, password: mockPassword},
    })
      .provide([
        [
          call(signInAuthUserWithEmailAndPassword, mockEmail, mockPassword),
          throwError(mockError),
        ],
      ])
      .put(signInFailed(mockError))
      .run();
  });

  test('signInWithGoogle Saga Success Path Should Call signInWithGooglePopup and Call getSnapshotFromUserAuth', () => {
    const mockUser = {id: 1, name: 'test'};
    const mockGoogleVal = {user: mockUser};

    return expectSaga(signInWithGoogle)
      .provide([[call(signInWithGooglePopup), mockGoogleVal]])
      .call(getSnapshotFromUserAuth, mockUser)
      .run();
  });

  test('signInWithGoogle Saga Error Path Should Call signInWithGooglePopup and Put signInFailed on Error', () => {
    const mockError = new Error('test Error');

    return expectSaga(signInWithGoogle)
      .provide([[call(signInWithGooglePopup), throwError(mockError)]])
      .put(signInFailed(mockError))
      .run();
  });

  test('getSnapshotFromUserAuth Saga Should Call createUserDocumentFromAuth and Put signInSuccess', () => {
    const mockUserAuth = {id: 1, name: 'test'};
    const mockAdditionalDetails = {displayName: 'test'};
    const mockUserSnapshot = {id: 2, data: () => ({displayName: 'test'})};

    return expectSaga(
      getSnapshotFromUserAuth,
      mockUserAuth,
      mockAdditionalDetails
    )
      .provide([
        [
          call(createUserDocumentFromAuth, mockUserAuth, mockAdditionalDetails),
          mockUserSnapshot,
        ],
      ])
      .put(signInSuccess({id: mockUserSnapshot.id, ...mockUserSnapshot.data()}))
      .run();
  });

  test('getSnapshotFromUserAuth Saga Error Path Should Put signInFailed on Error', () => {
    const mockUserAuth = {id: 1, name: 'test'};
    const mockAdditionalDetails = {displayName: 'test'};
    const mockError = new Error('test Error');

    return expectSaga(
      getSnapshotFromUserAuth,
      mockUserAuth,
      mockAdditionalDetails
    )
      .provide([
        [
          call(createUserDocumentFromAuth, mockUserAuth, mockAdditionalDetails),
          throwError(mockError),
        ],
      ])
      .put(signInFailed(mockError))
      .run();
  });
});
