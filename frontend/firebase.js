// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

// Create a root reference
const storage = getStorage();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWvIEbINwU8Beirlw0cvFo0cbyE-rFNGU",
  authDomain: "fundx-b98a4.firebaseapp.com",
  projectId: "fundx-b98a4",
  storageBucket: "fundx-b98a4.appspot.com",
  messagingSenderId: "711544193733",
  appId: "1:711544193733:web:38aa4f2c00f45f55a466ac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
