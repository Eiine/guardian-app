import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCNyP61EC8PyFN9IDpCJyeZOSuppn1xVXk",
  authDomain: "lista-de-libros-f44e3.firebaseapp.com",
  projectId: "lista-de-libros-f44e3",
  storageBucket: "lista-de-libros-f44e3.firebasestorage.app",
  messagingSenderId: "751878950494",
  appId: "1:751878950494:web:fc09d701a474f9ef70eecf"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
