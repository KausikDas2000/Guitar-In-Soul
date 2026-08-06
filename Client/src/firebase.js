// firebase.js

import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBef6wrUkSt1e76s8u7vsrqjXpHyjaYuYM",
  authDomain: "guitar-in-soul.firebaseapp.com",
  projectId: "guitar-in-soul",
  storageBucket: "guitar-in-soul.firebasestorage.app",
  messagingSenderId: "69388274348",
  appId: "1:69388274348:web:fc78ed50202c0d9339ad09",
  measurementId: "G-8EDMLT94M4",
};

const app = initializeApp(firebaseConfig);


// Cloud Messaging
export const messaging = getMessaging(app);

export default app;