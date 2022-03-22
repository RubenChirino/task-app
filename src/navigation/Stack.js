import { createStackNavigator } from "@react-navigation/stack";

// Pages
import Home from "../screens/Home";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export default MyStack;
