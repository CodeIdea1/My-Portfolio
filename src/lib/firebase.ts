import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBzBkt6cZR6Z7gKgwyayaCyO3PZtCKZlHI",
  authDomain: "codeidea-54c38.firebaseapp.com",
  databaseURL: "https://codeidea-54c38-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "codeidea-54c38",
  storageBucket: "codeidea-54c38.firebasestorage.app",
  messagingSenderId: "725714564524",
  appId: "1:725714564524:web:c7db748581dc7d9899f609"
};

let app: FirebaseApp;
let database: Database;

if (typeof window !== 'undefined') {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
  database = getDatabase(app);
}

export { database };