import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

import { authUser, registerUser } from "../../services/auth/auth";

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const AuthScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isAuthorized = !!route.params?.isAuthorized;
  const [isAtuthorizedUser, setIsAuthorizedUser] = useState(isAuthorized);
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
    <View>
      {!isAtuthorizedUser && (
        <>
          <Text>Name</Text>
          <TextInput placeholder="Name" value={name} onChangeText={setName} />
        </>
      )}
      <Text>Email</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <Text>Password</Text>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      {error && <Text>{error}</Text>}
      <Button
        title={isAtuthorizedUser ? "Login" : "Sign Up"}
        onPress={handleRegister}
      />
      {isAtuthorizedUser && (
        <Text onPress={() => setIsAuthorizedUser(false)}>
          Want to create new account? Register!
        </Text>
      )}
    </View>
  );
};

export default AuthScreen;
