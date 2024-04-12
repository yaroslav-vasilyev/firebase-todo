import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View } from "react-native";
import { Text, Button, TextInput, Icon } from "react-native-paper";

import { authUser, registerUser } from "../../services/auth/auth";
import { screenWrapper } from "../../shared/globalStyles";

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const AuthScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isAtuthorizedUser, setIsAuthorizedUser] = useState(
    !!route.params?.isAuthorized,
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      if (isAtuthorizedUser) {
        await authUser(email, password);
      } else {
        if (!isValidEmail(email)) {
          setError("Invalid email address");
          return;
        }
        await registerUser(email, password);
      }
      navigation.replace("TodoListScreen", { name });
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <View
      style={[
        screenWrapper,
        {
          justifyContent: "center",
          gap: 15,
        },
      ]}
    >
      <Text variant="displayLarge" style={{ alignSelf: "center" }}>
        Todo app
      </Text>
      <Icon source="" />
      {!isAtuthorizedUser && (
        <>
          <TextInput label="Name" value={name} onChangeText={setName} />
        </>
      )}
      <TextInput label="Email" value={email} onChangeText={setEmail} />
      <TextInput label="Password" value={password} onChangeText={setPassword} />
      {error && <Text>{error}</Text>}
      <Button mode="contained" onPress={handleRegister}>
        {isAtuthorizedUser ? "Login" : "Sign Up"}
      </Button>
      {isAtuthorizedUser && (
        <Button
          style={{ alignSelf: "center" }}
          onPress={() => setIsAuthorizedUser(false)}
        >
          Want to create a new account? Register!
        </Button>
      )}
    </View>
  );
};

export default AuthScreen;
