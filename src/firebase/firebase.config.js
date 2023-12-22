// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDw5KGxl1WKnhubWtO-G4qNiKCbEJHr9zE",
  authDomain: "task-management-a299c.firebaseapp.com",
  projectId: "task-management-a299c",
  storageBucket: "task-management-a299c.appspot.com",
  messagingSenderId: "395310619908",
  appId: "1:395310619908:web:4f22c081e000f3692dc451"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;