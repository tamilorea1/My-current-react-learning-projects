// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

// Your web app's Firebase configuration
// You'll get these values from Firebase Console > Project Settings > General tab
const firebaseConfig = {
  apiKey: "AIzaSyDcWKObljLcgH9E5LauDBCtXekBVGbhrTU",
  authDomain: "cybersecurity-threat-detector.firebaseapp.com",
  projectId: "cybersecurity-threat-detector",
  storageBucket: "cybersecurity-threat-detector.firebasestorage.app",
  messagingSenderId: "35697449024",
  appId: "1:35697449024:web:72040edaaf20230a04e7a5",
  measurementId: "G-0GP9LKJH4Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Functions
export const functions = getFunctions(app);

// If you're running locally, connect to the Functions emulator
// Comment this out when deploying to production
// connectFunctionsEmulator(functions, "localhost", 5001);

export default app;