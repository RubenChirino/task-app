import { Appearance } from "react-native";
import { TOGGLE_THEME } from "../actions/types";

const themes = {
  light: "light",
  dark: "dark",
};

const colorScheme = Appearance.getColorScheme();

const initialState = {
  theme: colorScheme === themes.dark ? themes.dark : themes.light,
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === themes.light ? themes.dark : themes.light,
      };

    default:
      return { ...state };
  }
};

export default themeReducer;
