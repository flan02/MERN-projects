/* eslint-disable no-unused-vars */
import { useEffect } from "react"
import { useTasks } from "../context/TasksContext"

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
          <div key={index} className="task__item" >
            <h2  >{task.title}</h2>
            <p>{task.description}</p>
          </div>
        ))
      }
      </div>
    </>
  )
}

export default TasksPage