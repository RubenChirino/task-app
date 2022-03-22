import React from "react";

// Icons
import IconFontAwesome5 from "react-native-vector-icons/FontAwesome5";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";

// Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Pages
import Home from "../screens/Home";
import Settings from "../screens/Settings";

// Themes
import { THEMES } from "../styles/themes";

// Redux
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

export default function NavigationTab() {
  const theme = useSelector((state) => state.theme);
  const themeStyles = THEMES[theme];

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: themeStyles.colors.primary,
        tabBarStyle: {
          backgroundColor: themeStyles.colors.card,
          paddingVertical: 5,
          borderTopColor: themeStyles.colors.card,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          //   title: "",
          //   headerTransparent: true,
          tabBarLabel: "Tasks",
          tabBarIcon: ({ color, size }) => (
            <IconFontAwesome5 name="tasks" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <IconMaterialIcons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
