import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCG7DYppBI05vn2Wo3u2Y3s_KQsoSrGf8Y",
  authDomain: "family-phys-ed-c36d9.firebaseapp.com",
  projectId: "family-phys-ed-c36d9",
  storageBucket: "family-phys-ed-c36d9.firebasestorage.app",
  messagingSenderId: "146456419976",
  appId: "1:146456419976:web:b4bce3e6fcd2467cf7c93d",
  measurementId: "G-WWX3599J1B"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
