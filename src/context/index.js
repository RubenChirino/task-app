import React, { useState } from "react";
import { MESSAGES } from "../utils/basics";

const Context = React.createContext();

function ContextProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const values = {
    tasks,
    addTask: (newTask) => {
      setTasks([...tasks, newTask]);
    },
    deleteTask: (id) => {
      setTasks((allTasks) => {
        const taskToDelete = allTasks.findIndex((task) => task.id == id);

        if (taskToDelete === -1) {
          console.error(MESSAGES.notFound);
        } else {
          tasks.splice(taskToDelete, 1);
        }

        return allTasks;
      });
    },
    updateTask: (id, payload) => {
      setTasks((allTasks) => {
        const taskToUpdate = allTasks.find((task) => task.id === id);

        if (!taskToUpdate) {
          console.error(MESSAGES.notFound);
        } else {
          for (const [key, value] of Object.entries(payload)) {
            taskToUpdate[key] = value;
          }
        }

        return allTasks;
      });
    },
    setTasks,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
}

export { ContextProvider, Context };
