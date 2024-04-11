import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";

const TodoListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const name = route.params?.name;
  const currentUser = auth().currentUser;

  const [todos, setTodos] = useState([]);

  // Загрузка списка задач пользователя из Firestore
  const loadTodos = async () => {
    try {
      const userID = currentUser.uid;
      const userTodosRef = firestore()
        .collection("users")
        .doc(userID)
        .collection("todos");
      const snapshot = await userTodosRef.get();
      const todosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todosData);
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []); // При монтировании компонента загружаем список задач

  // Выход пользователя и возврат на экран аутентификации
  const handleLogout = () => {
    navigation.navigate("AuthScreen", { isAuthorized: true });
  };

  return (
    <View>
      <Text>TodoListScreen</Text>
      <Text>Hello {name}!</Text>
      {/* Отображение списка задач */}
      {todos.map((todo) => (
        <Text key={todo.id}>{todo.title}</Text>
      ))}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default TodoListScreen;
