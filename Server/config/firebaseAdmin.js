import { cert, initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
import serviceAccount from "../guitar-in-soul-firebase-adminsdk-fbsvc-2793261a4e.json" with { type: "json" };


initializeApp({
  credential: cert(serviceAccount),
});


export default admin;