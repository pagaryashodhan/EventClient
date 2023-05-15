import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAuzJUU6j4H7C8vY-9Dxdx2Iz8CeYI6uU",
  authDomain: "payment-history-69ce9.firebaseapp.com",
  projectId: "payment-history-69ce9",
  storageBucket: "payment-history-69ce9.appspot.com",
  messagingSenderId: "1080307475798",
  appId: "1:1080307475798:web:7af8a8486f646f146ba2f7",
  measurementId: "G-0LWFECK8RF"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };
