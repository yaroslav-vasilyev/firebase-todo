import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

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
  deleteDoc(doc(FIREBASE_DB, "users", userID, "todos", todoID));
};

export const updateTodoOrderInDB = async (userID, orderedTodos) => {
  try {
    const updates = orderedTodos.map((todo, index) => {
      return {
        id: todo.id,
        changes: {
          order: index,
        },
      };
    });

    await Promise.all(
      updates.map(({ id, changes }) =>
        updateDoc(doc(FIREBASE_DB, "users", userID, "todos", id), changes),
      ),
    );
  } catch (error) {
    console.error("Error updating todo order in Firestore:", error);
  }
};
