import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// EcoTrace Live Firebase Web Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlxj0GwHK9XyEYxAwFWS2R8mTBUjNqZnE",
  authDomain: "ecotrace-2edaf.firebaseapp.com",
  projectId: "ecotrace-2edaf",
  storageBucket: "ecotrace-2edaf.firebasestorage.app",
  messagingSenderId: "256027827315",
  appId: "1:256027827315:web:0618b16e07ca64741cde06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
