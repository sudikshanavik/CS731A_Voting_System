// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCS02cSdYXkLlj1-b1QIIVBZfkSz2PguLo",
    authDomain: "cs731-project.firebaseapp.com",
    projectId: "cs731-project",
    storageBucket: "cs731-project.appspot.com",
    messagingSenderId: "230972877066",
    appId: "1:230972877066:web:a2e73580adf879ad45f2f3",
    measurementId: "G-HLNXT7Z7K2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)