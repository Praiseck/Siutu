// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQekLBLiWeHrp5XVV3Yil-Q93gYICbu_c",
  authDomain: "siutu-2c66c.firebaseapp.com",
  projectId: "siutu-2c66c",
  storageBucket: "siutu-2c66c.appspot.com",
  messagingSenderId: "626363654658",
  appId: "1:626363654658:web:e29227878231792dbc7d1b",
  //measurementId: "G-DDWTMJDTSJ"  // <-- Agrega esta línea solo si usas Firebase Analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;