import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootNavigator = () => {
  const RootStack = createNativeStackNavigator();

  return (
    <RootStack.Navigator>
      <TabStack.Screen
        name="AuthScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <TabStack.Screen
        name="TodoListScreen"
        component={DriverNavigator}
        options={{ headerShown: true }}
      />
    </RootStack.Navigator>
  )
}