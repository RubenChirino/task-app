import { TOGGLE_THEME } from "./types";

const toggleTheme = (payload) => ({
  type: TOGGLE_THEME,
  payload,
});

export { toggleTheme };
