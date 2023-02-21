import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { initializeFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyA5c26a7vtgBVuBvY_zrsVH9F4M53GaDzY",
    authDomain: "aquatally-b39ee.firebaseapp.com",
    projectId: "aquatally-b39ee",
    storageBucket: "aquatally-b39ee.appspot.com",
    messagingSenderId: "348367663854",
    appId: "1:348367663854:web:c6d6f2bf6cbf3589d379ff"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = initializeFirestore(app, { experimentalForceLongPolling: true })

export { db, auth }