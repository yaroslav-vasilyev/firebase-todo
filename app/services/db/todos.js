import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";

import { FIREBASE_DB } from "../firebase/firebaseConfig";

export const addTodoToDB = async (userID, todo) => {
  try {
    const docRef = await addDoc(
      collection(FIREBASE_DB, "users", userID, "todos"),
      todo,
    );

    return docRef.id;
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};

export const removeTodoFromDB = async (userID, todoID) => {
  deleteDoc(doc(FIREBASE_DB, "users", userID, "cart", todoID));
};
