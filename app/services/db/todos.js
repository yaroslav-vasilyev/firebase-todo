import firestore from "@react-native-firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

import { FIREBASE_DB } from "../firebase/firebaseConfig";

export const addTodoToDB = async (userID, todo) => {
  try {
    const todosCollectionRef = addDoc(collection(FIREBASE_DB, 'todos'));


    console.log("Todo added successfully!");
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};
