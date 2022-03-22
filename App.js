import "react-native-gesture-handler";
import React from "react";

// Redux
import { createStore } from "redux";
import { Provider } from "react-redux";

// Context
// import { ContextProvider } from "./src/context";

/* === Navigation === */
import { NavigationContainer } from "@react-navigation/native";

// Types
// import MyStack from "./src/navigation/Stack";
import MyBottomTab from "./src/navigation/Tab";

// Reducer
import themeReducer from "./src/redux/reducers/themeReducer";

const store = createStore(
  themeReducer,
  // Redux Devtools (Navigator extension)
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <ContextProvider>   barStyle={statusBarStyle} */}
        <MyBottomTab />
        {/* </ContextProvider> */}
      </NavigationContainer>
    </Provider>
  );
}
