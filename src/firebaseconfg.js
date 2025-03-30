// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAfpsSU9VlGcZcrzcDU5Q0bHg_Lla5gJeY",
    authDomain: "cloud-project-95dc1.firebaseapp.com",
    projectId: "cloud-project-95dc1",
    storageBucket: "cloud-project-95dc1.firebasestorage.app",
    messagingSenderId: "730069642801",
    appId: "1:730069642801:web:28be926519e2fb2601af10",
    measurementId: "G-7PSQTP9HLK"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };