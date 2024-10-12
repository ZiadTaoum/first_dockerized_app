import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { connectFirestoreEmulator } from "firebase/firestore";


// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-5rJCYfkCUF7XZsKtN4pIaYKC9JQzVHg",
  authDomain: "fullstack-project-f6937.firebaseapp.com",
  projectId: "fullstack-project-f6937",
  storageBucket: "fullstack-project-f6937.appspot.com",
  messagingSenderId: "576096011738",
  appId: "1:576096011738:web:4d8c5d7c27d8c0b5bface3",
  measurementId: "G-QC33QPRV91"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore and connect to the emulator (for development)
const db = getFirestore(app);
if (process.env.NODE_ENV === "development") {
  console.log("Connecting to Firestore Emulator...");
  connectFirestoreEmulator(db, "localhost", 8082);  // Use the correct emulator port here
}

// Initialize Firestore
// const db = getFirestore(app);

function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // Fetch users from Firestore
    useEffect(() => {
        const fetchUsers = async () => {
            const usersCollection = collection(db, 'users');
            const usersSnapshot = await getDocs(usersCollection);
            const usersList = usersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(usersList);
        };

        fetchUsers();
    }, []);

    // Function to add a collection and a document
    const addCollectionAndDocument = async (collectionName, docData) => {
        try {
            const docRef = await addDoc(collection(db, collectionName), docData);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    // Handle form submission (Add new user to Firestore)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = { name, email };

        try {
            // Use the new function to add user
            await addCollectionAndDocument("users", newUser);
            setUsers([...users, { id: newUser.id, ...newUser }]); // Update state with new user
            setName(''); // Reset form fields
            setEmail('');
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name} - {user.email}</li>
                ))}
            </ul>

            <h2>Add a new user:</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <button type="submit">Add User</button>
            </form>
        </div>
    );
}

export default App;
