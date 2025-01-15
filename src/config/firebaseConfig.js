// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDSWhiUF-dANNCpUf-wt5nOMQ7nkQwb4Q",
  authDomain: "dsport-386c2.firebaseapp.com",
  databaseURL: "https://dsport-386c2-default-rtdb.firebaseio.com",
  projectId: "dsport-386c2",
  storageBucket: "dsport-386c2.appspot.com",
  messagingSenderId: "845374939352",
  appId: "1:845374939352:web:88bf2f0ca2f4a5554ef7ad",
  measurementId: "G-T2CMT6NCTL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
const analytics = getAnalytics(app);

export default app;