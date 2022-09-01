import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCxjz6vpWmqQnSj1tyAMQqD20eTGfEHjfE",
    authDomain: "svelte-converse.firebaseapp.com",
    projectId: "svelte-converse",
    storageBucket: "svelte-converse.appspot.com",
    messagingSenderId: "374258618079",
    appId: "1:374258618079:web:726b81524b5df283a2236a",
    measurementId: "G-BQG54ZBRG2"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();