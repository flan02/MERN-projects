/* eslint-disable no-unused-vars */
import { useEffect } from "react"
import { useTasks } from "../context/TasksContext"
import TaskCard from "../components/TaskCard"


const TasksPage = () => {
    const { getTasks, tasks } = useTasks()
    
    useEffect(() => {
      getTasks()
    }, []) //* Refrescamos apenas carga el componente
  //console.log(tasks)
  if(tasks.length === 0) return (<h1>You have no tasks.</h1>)  
  return (
    <>
      <h1>List of Tasks</h1>
      <div className="task__cont">
      {
        tasks.map((task, index) => (
         <TaskCard task={task} key={index} />
        ))
      }
      </div>
    </>
  )
}

export default TasksPage