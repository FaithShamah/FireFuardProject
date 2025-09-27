// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
// Replace these with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyC6geuYVHu9WwfS4irRKb0mZMY-wawoHNc",
  authDomain: "fire-guard-7a64c.firebaseapp.com",
  databaseURL: "https://fire-guard-7a64c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fire-guard-7a64c",
  storageBucket: "fire-guard-7a64c.firebasestorage.app",
  messagingSenderId: "915279562059",
  appId: "1:915279562059:web:b9cf8f756471c6897314ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getDatabase(app); // Realtime Database
export const firestore = getFirestore(app); // Firestore
export const auth = getAuth(app); // Authentication

/* 
Expected Firebase Realtime Database Structure:
{
  "sensors": {
    "temperature": 25.5,      // Temperature in Celsius
    "humidity": 45.0,         // Humidity percentage (0-100%)
    "fire": false            // Boolean: true if fire detected
  },
  "alerts": {
    "alert1": {
      "type": "temperature",   // "temperature", "fire", or "humidity"
      "temperature": 65,
      "humidity": 30,
      "device_id": "fireguard-01",
      "timestamp": 1695828300
    }
  }
}
*/

export default app;