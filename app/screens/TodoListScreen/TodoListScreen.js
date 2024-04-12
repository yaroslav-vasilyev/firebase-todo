import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  Text,
  Button,
  TextInput,
  MD3Colors,
  IconButton,
} from "react-native-paper";

import { screenWrapper } from "../../shared/globalStyles";

const TodoListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const name = route.params?.name;
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState(null);
  const [error, setError] = useState("");

  const addTodo = async () => {
    if (todo) {
      setError("");
      setTodos((currentTodos) => [...currentTodos, todo]);
      setTodo("");
    } else {
      setError("Todo cannot be empty");
    }
  };

  const removeTodo = async (todo) => {
    setTodos((currentTodos) =>
      currentTodos.filter((currentTodo) => currentTodo !== todo),
    );
  };

  // useEffect(() => {
  //   loadTodos();
  // }, []);

  // Выход пользователя и возврат на экран аутентификации
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
      <Text variant="displayMedium" style={{ alignSelf: "center" }}>
        Hello {name}!
      </Text>
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
        {todos.map((currentTodo, index) => (
          <View
            style={{
              padding: 15,
              borderWidth: 0.5,
              borderRadius: 5,
              backgroundColor: MD3Colors.neutralVariant90,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text key={index}>{currentTodo}</Text>
            <IconButton
              icon="close"
              style={{ margin: 0 }}
              iconColor={MD3Colors.error30}
              onPress={() => removeTodo(currentTodo)}
              size={15}
            />
          </View>
        ))}
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
