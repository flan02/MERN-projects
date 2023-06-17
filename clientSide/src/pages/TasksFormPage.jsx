/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate } from "react-router-dom";



const TasksFormPage = () => {
  const { register, handleSubmit } = useForm();
  const { tasks, createTask } = useTasks()
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    //console.log(tasks)
    createTask(data) //enviamos los datos para el backend
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
          {...register("description")}
        ></textarea>
        <button className="addTask__submit">Save</button>
      </form>
    </div>
  );
};

export default TasksFormPage;
