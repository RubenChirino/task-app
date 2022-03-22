import AsyncStorage from "@react-native-async-storage/async-storage";
import { MESSAGES } from "../utils/basics";

// Storage
const TASKS_STORAGE = "tasks";

async function addTask(task) {
  try {
    const tasks = await getTasks();
    tasks.push(task);
    await AsyncStorage.setItem(TASKS_STORAGE, JSON.stringify(tasks));
  } catch (err) {
    console.error(err);
  }
}

async function getTasks() {
  try {
    const response = await AsyncStorage.getItem(TASKS_STORAGE);
    return JSON.parse(response || []);
  } catch (err) {
    console.error(err);
  }
}

async function removeTask(id) {
  const tasks = await getTasks();

  const indexToDelete = tasks.findIndex((task) => task.id == id);

  if (indexToDelete === -1) {
    console.error(MESSAGES.notFound);
  } else {
    tasks.splice(indexToDelete, 1);
  }

  await AsyncStorage.setItem(TASKS_STORAGE, JSON.stringify(tasks));

  return indexToDelete;
}

async function updateTask(id, payload) {
  const tasks = await getTasks();

  const taskToUpdate = tasks.find((task) => task.id == id);

  if (!taskToUpdate) {
    console.error(MESSAGES.notFound);
  } else {
    for (const [key, value] of Object.entries(payload)) {
      taskToUpdate[key] = value;
    }
  }

  await AsyncStorage.setItem(TASKS_STORAGE, JSON.stringify(tasks));

  return taskToUpdate;
}

export { getTasks, addTask, removeTask, updateTask };
