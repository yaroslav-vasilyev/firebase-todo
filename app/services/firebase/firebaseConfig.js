// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjF2rL3UPRCYgSiO1awJ9fWPMyDHTe6Uk",
  authDomain: "todo-app-8dc91.firebaseapp.com",
  projectId: "todo-app-8dc91",
  storageBucket: "todo-app-8dc91.appspot.com",
  messagingSenderId: "752876739585",
  appId: "1:752876739585:web:dcbbf84010f8f39b2eb400",
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Export necessary Firebase modules
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
