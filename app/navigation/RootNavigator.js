import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthScreen, TodoListScreen } from "../screens";

const RootNavigator = () => {
  const RootStack = createNativeStackNavigator();

  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="TodoListScreen"
        component={TodoListScreen}
        options={{ headerShown: true }}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
