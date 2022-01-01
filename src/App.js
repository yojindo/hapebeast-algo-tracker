import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  const [showAddTask, setShowAddTask] = useState(true)
  const [tasks, setTasks] = useState([])
  
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  //Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }
  
  //Fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }


  //delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })


    setTasks(tasks.filter((task) => task.id !== id))
  }

  //toggle reminder
  const toggleReminder = async (id) => {

    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle,reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) => 
        task.id === id ? {...task, reminder: data.reminder} : task
      )
    )
  }

  //Add Task
const addTask = async (task) => {

  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
    'Content-type': 'application/json',
    },
    body: JSON.stringify(task)
  })

  const data = await res.json()

  setTasks([...tasks, data])

}

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        <Routes>
        <Route path='/' exact element={
          <>
          {showAddTask && <AddTask onAdd={addTask}/>}
          {tasks.length > 0 ? (<Tasks tasks = {tasks} onDelete = {deleteTask} onToggle = {toggleReminder} /> ) : ('Go ape into more Algos!')}
          </>
        }/>
        <Route path='/about' element ={About()} />
        </Routes>
        <Footer/>
      </div>

      <div className ='hapeLogo-container'>
        <img className = 'hapeLogo' src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/82736b130553681.61829ee7d5466.png"/>
      </div>

    </Router>
    
  );
}

export default App
