/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const TasksFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { tasks, createTask, getTask, updateTask } = useTasks()
  const navigate = useNavigate()
  const params = useParams()

  //* Leemos los parametros pasados por URL a la carga para saber si crear o actualizar
  useEffect(() => {
    async function loadTask() {
        //console.log(params)
        //* Si existe peticionamos al backend p/ traer datos de esa tarea.
        if(params.id){
        const task = await getTask(params.id)
        setValue('title', task.title)
        setValue('description', task.description) //Establecemos nuevos valores para los elem del from
      }
    }
    loadTask()
  }, [])
  

//TODO: Si hay un parametro esta Editando sino esta Creando
  const onSubmit = handleSubmit((data) => {
    if(params.id){
      updateTask(params.id, data)
    }else {
      //console.log(tasks)
      createTask(data) //enviamos los datos para el backend
    }
    navigate('/tasks')
  });
  return (
    <div>
      <h1>Add New Task</h1>
      <form onSubmit={onSubmit} className="form-addTask">
        <input className="addTask__title" type="text" placeholder="Title" {...register("title")} />
        <textarea
          rows="3"
          placeholder="Description"
          {...register("description")} // ...register -> onChange/value/name (3 props devuelve)
        ></textarea>
        <button className="addTask__submit">Save</button>
      </form>
    </div>
  );
};

export default TasksFormPage;
