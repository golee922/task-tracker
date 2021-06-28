import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import Footer from './components/Footer'
import About from './components/About'

function App() {
    const [tasks, setTasks] = useState([]);
    const [showAddTask, setShowAddTask] = useState(false);

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks();
            setTasks(tasksFromServer);
        }
        getTasks();
    }, []);

    // Fetch Tasks
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks');
        const data = await res.json();
        return data;
    }

    // Fetch Task
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`);
        const data = await res.json();
        return data;
    }

    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' });
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }

    // Toggle Reminder
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id);
        const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

        const res = await fetch(`http://localhost:5000/tasks/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updTask) })
        const data = await res.json();

        setTasks(prevTasks =>
            prevTasks.map(task =>
            (task.id === id ?
                { ...task, reminder: !data.reminder } : task)
            ))
    }

    const addNewTask = async (newTask) => {
        const res = await fetch('http://localhost:5000/tasks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newTask) });

        const data = await res.json();
        setTasks(prevTasks => [...prevTasks, data]);

        // setTasks(prevTasks => {
        //     newTask.id = Math.floor(Math.random() * 1000);
        //     return [...prevTasks, newTask];
        // });
    }

    const handleShowAddTask = () => {
        setShowAddTask(prevValue => !prevValue);
    }

    return (
        <Router>
            <div className='container'>
                <Header btnOnClick={handleShowAddTask} showAdd={showAddTask} />
                <Route path='/' exact render={(props) => (<> {showAddTask && <AddTask addNewTask={addNewTask} />}
                    {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks To Show'}</>)} />
                <Route path='/about' component={About} />
                <Footer />
            </div>
        </Router>
    );
}




export default App;