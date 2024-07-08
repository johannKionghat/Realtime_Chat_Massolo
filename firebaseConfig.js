// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getReactNativePersistence, initializeAuth} from 'firebase/auth';
// Your web app's Firebase configuration
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfAxbte_c8DyqUGkZK43rbzSwNO5C-ZlM",
  authDomain: "fir-massolo.firebaseapp.com",
  projectId: "fir-massolo",
  storageBucket: "fir-massolo.appspot.com",
  messagingSenderId: "381430620296",
  appId: "1:381430620296:web:91b6ab3c7a478c45793f3d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app,{
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export const usersRef= collection(db, 'users');
export const roomsRef= collection(db, 'rooms');