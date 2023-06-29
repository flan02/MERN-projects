/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
//TODO creamos un contexto para las tareas por si las necesitamos desde distintos componentes de nuestras app.

import { createContext, useContext, useState } from "react";
import { createTaskRequest, updateTaskRequest, getTasksRequest, deleteTaskRequest, getTaskRequest } from "../api/tasks";

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

    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id)
            //* Hacer un arreglo nuevo filtrando la qe acabamos de eliminar
            if(res.status === 204) setTasks(tasks.filter((task) => task._id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    const getTask = async (id) => {
       try {
        const res = await getTaskRequest(id)
        //console.log(res)
        return res.data
        } catch (error) {
        console.log(error);
       }
    }

    const updateTask = async (id, newTask) => {
        try {
            await updateTaskRequest(id, newTask)
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <TaskContext.Provider value={{ tasks, createTask, updateTask, getTasks, deleteTask, getTask }}>
      {children}
    </TaskContext.Provider>
  );
};
