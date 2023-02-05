
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_APP_ID,
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



// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAP4oWqKYSw-GE6hMhFUsTmdjrr77650ZY",
//   authDomain: "doctors-portal-3d214.firebaseapp.com",
//   projectId: "doctors-portal-3d214",
//   storageBucket: "doctors-portal-3d214.appspot.com",
//   messagingSenderId: "128481479897",
//   appId: "1:128481479897:web:b583dd7961e6cd39c382c8"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);