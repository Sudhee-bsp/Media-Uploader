import firebase from "firebase/compat/app";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfPtIVBrJIgP9jaUVHymMNQuqP19Nz1Gg",
  authDomain: "clipart-7c32f.firebaseapp.com",
  projectId: "clipart-7c32f",
  storageBucket: "clipart-7c32f.appspot.com",
  messagingSenderId: "573422565712",
  appId: "1:573422565712:web:c504579b4c8e5a7f07d455",
  measurementId: "G-8SKD42CXDT",
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { firebase, storage as default };
