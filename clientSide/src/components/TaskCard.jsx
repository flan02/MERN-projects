/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"
import { useTasks } from "../context/TasksContext"

const TaskCard = ({ task }) => {
  const { deleteTask } = useTasks()

    return (
    <div className="task__item" >
        <span>{new Date(task.date).toLocaleDateString()}</span>
        <h2>{task.title}</h2>
        <div>
            <button onClick={() => { deleteTask(task._id) }}>delete</button>
            <Link to={`/tasks/${task._id}`}>edit</Link>
        </div>
        <p>{task.description}</p>
        
    </div>
  )
}

export default TaskCard