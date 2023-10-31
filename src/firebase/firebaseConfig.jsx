
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

/*
* setting object containing information about which firebase project the application is connected to
 */

const firebaseConfig = {
  apiKey: "AIzaSyBm5h-4gHffN5uVtN7qBm-vlQNvobNs6wA",
  authDomain: "chatlesh-91062.firebaseapp.com",
  projectId: "chatlesh-91062",
  storageBucket: "chatlesh-91062.appspot.com",
  messagingSenderId: "441889375889",
  appId: "1:441889375889:web:1e72e01da507c9d194e130"
};

// bridge
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// setup required for google authorization
export const provider = new GoogleAuthProvider();

//Installation of fire store for use within the application 
export const db = getFirestore(app);// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


// Initialize Firebase
