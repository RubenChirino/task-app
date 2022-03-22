import { Platform } from "react-native";

const isIOS = Platform.OS === "ios";

/* ==== Messages ==== */

const MESSAGES = {
  notFound: "No task found with the ID you provided.",
};

/* ==== Functions ==== */

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export { isIOS, MESSAGES, random };
