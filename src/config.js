// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIYjX1RgowbCm-0RTV6AHY8rUVdrNQjaY",
  authDomain: "estrada-sandbox.firebaseapp.com",
  projectId: "estrada-sandbox",
  storageBucket: "estrada-sandbox.firebasestorage.app",
  messagingSenderId: "533761478086",
  appId: "1:533761478086:web:d54ce39b861c32cb7036c7",
  measurementId: "G-HGR0L8YBX3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
