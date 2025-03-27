import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfpsSU9VlGcZcrzcDU5Q0bHg_Lla5gJeY",
  authDomain: "cloud-project-95dc1.firebaseapp.com",
  projectId: "cloud-project-95dc1",
  storageBucket: "cloud-project-95dc1.appspot.com",
  messagingSenderId: "730069642801",
  appId: "1:730069642801:web:28be926519e2fb2601af10",
  measurementId: "G-7PSQTP9HLK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Ensure analytics runs only in the browser
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export default app;

export let fireDB = getFirestore(app);
export let auth = getAuth(app);
