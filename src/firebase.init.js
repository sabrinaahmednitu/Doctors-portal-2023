
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAP4oWqKYSw-GE6hMhFUsTmdjrr77650ZY",
  authDomain: "doctors-portal-3d214.firebaseapp.com",
  projectId: "doctors-portal-3d214",
  storageBucket: "doctors-portal-3d214.appspot.com",
  messagingSenderId: "128481479897",
  appId: "1:128481479897:web:b583dd7961e6cd39c382c8",
};

 // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app);

export default auth;


