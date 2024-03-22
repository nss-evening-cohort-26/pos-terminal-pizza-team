import firebase from 'firebase/app';
import 'firebase/auth';
import { adminUIDs } from './client';

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

const adminCheck = (uid) => {
  const isAdmin = Object.values(adminUIDs).filter((admin) => admin === uid).length > 0;
  return isAdmin;
};

export { signIn, signOut, adminCheck };
