// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzBkt6cZR6Z7gKgwyayaCyO3PZtCKZlHI",
  authDomain: "codeidea-54c38.firebaseapp.com",
  databaseURL: "https://codeidea-54c38-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "codeidea-54c38",
  storageBucket: "codeidea-54c38.firebasestorage.app",
  messagingSenderId: "725714564524",
  appId: "1:725714564524:web:c7db748581dc7d9899f609"
};

// Initialize Firebase
let app;
let database;

try {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export { database };