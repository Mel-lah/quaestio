import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyBQCdaaUuHGTKY14LF8HDYZSfC5IMo6zx0',
  authDomain: 'quaestio-1cec5.firebaseapp.com',
  projectId: 'quaestio-1cec5',
  storageBucket: 'quaestio-1cec5.appspot.com',
  messagingSenderId: '337704887277',
  appId: '1:337704887277:web:7820695c3c13fc014d3de4'
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
    db,
    auth
}