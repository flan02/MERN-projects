/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
//TODO creamos un contexto para las tareas por si las necesitamos desde distintos componentes de nuestras app.

import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest } from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const createTask = async (task) => {
    const res = await createTaskRequest(task);
    console.log(res);
  };

  const getTasks = async (task) => {
    try {
        const res = await getTasksRequest(task);
        //console.log(res);
        setTasks(res.data)
    } catch (error) {
        console.log(error)
    }
};

  return (
    <TaskContext.Provider value={{ tasks, createTask, getTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
