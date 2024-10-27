// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCYpWnWRpPV2l9ntifyxa97Shfy7ssRh0",
  authDomain: "techreportbyncteck.firebaseapp.com",
  projectId: "techreportbyncteck",
  storageBucket: "techreportbyncteck.appspot.com",
  messagingSenderId: "767473775257",
  appId: "1:767473775257:web:a035aec494cb33536d3e08",
  measurementId: "G-K05SXKVR05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app