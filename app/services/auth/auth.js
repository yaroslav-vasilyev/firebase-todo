import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { FIREBASE_AUTH } from "../firebase/firebaseConfig";

export const registerUser = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
  } catch (error) {
    console.log(error.message);
    throw new Error(
      `Error during register user: ${error.message.substring("Firebase: ".length)}`,
    );
  }
};

export const authUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
  } catch (error) {
    console.log(error.message);
    throw new Error(
      `Error during login user: ${error.message.substring("Firebase: ".length)}`,
    );
  }
};
