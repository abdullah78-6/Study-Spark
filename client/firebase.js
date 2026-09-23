import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: "e-learn-22573.firebaseapp.com",
  projectId: "e-learn-22573",
  storageBucket: "e-learn-22573.firebasestorage.app",
  messagingSenderId: "344352339766",
  appId: "1:344352339766:web:c8b1006c69588fde07e597",
  measurementId: "G-5BC07L80BM"
};
const app = initializeApp(firebaseConfig);
const auth=getAuth();
const analytics = getAnalytics(app);
export {app,auth}