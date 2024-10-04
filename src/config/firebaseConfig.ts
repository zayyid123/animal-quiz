// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxmVNNh5v6yWKNvpYB6t5wSTRAxxCcllM",
  authDomain: "animalquizz-67147.firebaseapp.com",
  projectId: "animalquizz-67147",
  storageBucket: "animalquizz-67147.appspot.com",
  messagingSenderId: "224479643171",
  appId: "1:224479643171:web:a956f1f0866f8436835396",
  measurementId: "G-CZ4BNCFSNG"
};

// Initialize Firebase
const fbConfig = initializeApp(firebaseConfig);
export {fbConfig}