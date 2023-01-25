// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
    apiKey: 'AIzaSyBccQtalaBCE_AWFrJCKtXXhMOyZL0mH28',
    authDomain: 'swapi-demo-f0090.firebaseapp.com',
    projectId: 'swapi-demo-f0090',
    storageBucket: 'swapi-demo-f0090.appspot.com',
    messagingSenderId: '25956058961',
    appId: '1:25956058961:web:5b285036eac1fbaf43f570',
    measurementId: 'G-7NZ7Z173HX',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
