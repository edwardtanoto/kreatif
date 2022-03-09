import firebase  from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyALerqAA14bkVTOU4q3YIEk4-ccXDycsv4",
    authDomain: "kreatif-54984.firebaseapp.com",
    projectId: "kreatif-54984",
    storageBucket: "kreatif-54984.appspot.com",
    messagingSenderId: "411240915015",
    appId: "1:411240915015:web:093bb768b0227217e9d162",
    measurementId: "G-D65LQNZSWJ"
  };
  
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export async function getUserWithUsername(username) {
    const usersRef = firestore.collection('users');
    const query = usersRef.where('username', '==', username).limit(1);
    const userDoc = (await query.get()).docs[0];
    return userDoc;
}

export function postToJSON(doc) {
    const data = doc.data();
    return {
      ...data,
      // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
      createdAt: data?.createdAt.toMillis(),
      updatedAt: data?.updatedAt.toMillis(),
    };
}
export function userToJSON(doc) {
    const data = doc.data();
    return {
      ...data,
    };
}
export function serviceToJSON(doc){
  const data = doc.data();
  return {
    ...data,
  };
}
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;
export const increment = firebase.firestore.FieldValue.increment;
export const getDoc = firebase.firestore.getDoc