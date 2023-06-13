import Tasks from "../models/task.model.js"

export const getTasks = async (req, res) => {
    const tasks = await Tasks.find({
        user: req.user.id //me trae todas las tareas de un usuario autenticado
    }).populate('user')
    res.json(tasks)
}

export const createTask = async (req, res) => {
    const { title, description, date } = req.body
    //console.log(req.user)
    const Task = new Tasks({
        title,
        description,
        date,
        user: req.user.id //se obtiene desde authRequired
    })
    const savedTask = await Task.save()
    res.json(savedTask)
}

export const getTask = async (req, res) => {
    const task = await Tasks.findById(req.params.id).populate('user')
    if(!task) return res.status(404).json({ message: "Task not found." })
    res.json(task)
}

export const deleteTask = async (req, res) => {
    console.log('HELLO OLLIE');
    const task = await Tasks.findByIdAndDelete(req.params.id)
    if(!task) return res.status(404).json({ message: "Task not found." })
    return res.sendStatus(204) //salio todo bien, pero no hay nada p/ mostrar.
}

export const updateTask = async (req, res) => {
    const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, 
        { new: true })
    if(!task) return res.status(404).json({ message: "Task not found." })
    res.json(task)
}

//! mongoose por defecto cuando actualiza te devuelve el dato anterior.
//! por eso paso por 3er param ({ new: true })


/*
? Sin populate
{
  "title": "mi first task",
  "description": "mi first description",
  "date": "2023-06-13T03:41:39.071Z",
  *"user": "6487b17fd11a58b99d04b801",
  *"_id": "6487e57357b5bb9e85813bb2", id task
  "createdAt": "2023-06-13T03:41:39.073Z",
  "updatedAt": "2023-06-13T03:41:39.073Z",
  "__v": 0
}

? Con populate (creamos una relacion entre tarea y usuario )
{
    *"_id": "6487e57357b5bb9e85813bb2", id task
    "title": "mi first task",
    "description": "mi first description",
    "date": "2023-06-13T03:41:39.071Z",
    *"user": {
      *"_id": "6487b17fd11a58b99d04b801", id user
      "username": "test11",
      "email": "test11@gmail.com.ar",
      "password": "$2a$10$9EypgIBuEWTq.fNB6RTF5OcLp/HwOe2bNsW02EJCAnbbbn/MjwiD.",
      "createdAt": "2023-06-12T23:59:59.841Z",
      "updatedAt": "2023-06-12T23:59:59.841Z",
      "__v": 0
    },
    "createdAt": "2023-06-13T03:41:39.073Z",
    "updatedAt": "2023-06-13T03:41:39.073Z",
    "__v": 0
}

*/