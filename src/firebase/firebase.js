
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHHKmdo-5bau5kwWjUL2q7luRjw1LixbQ",
  authDomain: "task4ecommercewebsite.firebaseapp.com",
  projectId: "task4ecommercewebsite",
//   storageBucket: "task4ecommercewebsite.firebasestorage.app",
  storageBucket: "task4ecommercewebsite.appspot.com",
  messagingSenderId: "300151702063",
  appId: "1:300151702063:web:42f47f54f2ac8b1736bcda",
  measurementId: "G-ZF62TDGPQ3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
