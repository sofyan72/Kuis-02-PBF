import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAk8jtIxKf8A8Vykmz4mtkVY4GdQwAcpDY",
  authDomain: "kuis-02-9dd58.firebaseapp.com",
  projectId: "kuis-02-9dd58",
  storageBucket: "kuis-02-9dd58.appspot.com",
  messagingSenderId: "877615840027",
  appId: "1:877615840027:web:f65fb800ae19ab211e71be",
  measurementId: "G-49CW707DR4"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;