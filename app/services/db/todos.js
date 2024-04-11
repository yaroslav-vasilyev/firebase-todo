import firestore from "@react-native-firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

import { FIREBASE_DB } from "../firebase/firebaseConfig";

export const addTodoToDB = async (userID, todo) => {
  try {
    // Путь к коллекции задач для конкретного пользователя (например, используя идентификатор пользователя)
    const todosCollectionRef = firestore().collection(`users/${userID}/todos`);

    // Добавление новой задачи в коллекцию
    await todosCollectionRef.add(todo);

    console.log("Todo added successfully!");
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};
