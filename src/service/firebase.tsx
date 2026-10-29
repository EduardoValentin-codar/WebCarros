// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBx2expvlYqyRQd3VJSOae2B1s6V-giE8I",
    authDomain: "webcarros-458ae.firebaseapp.com",
    projectId: "webcarros-458ae",
    storageBucket: "webcarros-458ae.firebasestorage.app",
    messagingSenderId: "711752405989",
    appId: "1:711752405989:web:53c974dfa60b66bfe5150c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export {db, auth, storage}