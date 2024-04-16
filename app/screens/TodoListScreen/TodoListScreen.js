import { useNavigation, useRoute } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import {
  Text,
  Button,
  TextInput,
  MD3Colors,
  IconButton,
  ActivityIndicator,
} from "react-native-paper";

import { addTodoToDB, removeTodoFromDB } from "../../services/db/todos";
import { FIREBASE_DB } from "../../services/firebase/firebaseConfig";
import { screenWrapper } from "../../shared/globalStyles";

const TodoListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const email = route.params?.email;
  const userID = email;

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const addTodo = async () => {
    if (todo) {
      // new todo
      const newTodo = {
        name: todo,
      };

      // db update
      const todoID = await addTodoToDB(userID, newTodo);

      newTodo.id = todoID;

      // local update
      setError("");
      setTodo("");
      setTodos((currentTodos) => [...currentTodos, newTodo]);
    } else {
      setError("Todo cannot be empty");
    }
  };

  const removeTodo = async (userID, todoID) => {
    removeTodoFromDB(userID, todoID);
    setTodos((currentTodos) =>
      currentTodos.filter((currentTodo) => currentTodo.id !== todoID),
    );
  };

  useEffect(() => {
    setLoading(true);
    getDocs(collection(FIREBASE_DB, "users", userID, "todos"))
      .then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodos(newData);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    navigation.navigate("AuthScreen", { isAuthorized: true });
  };

  return (
    <View
      style={[
        screenWrapper,
        {
          paddingTop: "15%",
          gap: 15,
        },
      ]}
    >
      <View style={{ flexGrow: 1, gap: 15 }}>
        <TextInput
          placeholder="What to do?"
          value={todo}
          onChangeText={setTodo}
        />
        <Button style={{ marginBottom: 15 }} mode="contained" onPress={addTodo}>
          Add todo
        </Button>
        {error && <Text>{error}</Text>}
        {loading && <ActivityIndicator size="large" />}
        <DraggableFlatList
          data={todos}
          containerStyle={{ flex: 1 }}
          keyExtractor={(item) => item.id}
          onDragEnd={({ data }) => {
            setTodos(data);
          }}
          renderItem={({ item, drag, isActive }) => (
            <TouchableOpacity
              onLongPress={drag}
              disabled={isActive}
              style={[
                {
                  padding: 15,
                  marginBottom: 15,
                  borderWidth: 0.5,
                  borderRadius: 5,
                  backgroundColor: MD3Colors.neutralVariant90,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                },
                {
                  backgroundColor: isActive
                    ? "red"
                    : MD3Colors.neutralVariant90,
                },
              ]}
            >
              <Text>{item.name}</Text>
              <IconButton
                icon="close"
                style={{ margin: 0 }}
                iconColor={MD3Colors.error30}
                onPress={() => removeTodo(userID, item.id)}
                size={15}
              />
            </TouchableOpacity>
          )}
        />
      </View>

      <Button
        style={{ marginBottom: 15 }}
        mode="contained"
        onPress={handleLogout}
      >
        Logout
      </Button>
    </View>
  );
};

export default TodoListScreen;
