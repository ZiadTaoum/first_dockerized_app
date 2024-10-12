// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC-5rJCYfkCUF7XZsKtN4pIaYKC9JQzVHg",
    authDomain: "fullstack-project-f6937.firebaseapp.com",
    projectId: "fullstack-project-f6937",
    storageBucket: "fullstack-project-f6937.appspot.com",
    messagingSenderId: "576096011738",
    appId: "1:576096011738:web:4d8c5d7c27d8c0b5bface3",
    measurementId: "G-QC33QPRV91"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Check if we are in development mode
if (process.env.NODE_ENV === "development") {
  // Connect to Firestore emulator
  connectFirestoreEmulator(db, "localhost", 8082);
}

// Usage
addCollectionAndDocument("users", { name: "John Doe", age: 30, email: "ahmad.doe@example.com" });

export { db };

export default app ; // Exporting app as a named export
