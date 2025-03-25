// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmARLVaEgwfzMIVe8J3KpGcquKa3GmZbM",
  authDomain: "myecom-e1186.firebaseapp.com",
  projectId: "myecom-e1186",
  storageBucket: "myecom-e1186.firebasestorage.app",
  messagingSenderId: "378290225180",
  appId: "1:378290225180:web:b40f7f8ef0e9daec97dfd9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }