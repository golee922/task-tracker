import {useState} from 'react';

const AddTask = ({addNewTask}) => {

    const [newTask, setNewTask] = useState({
        text : '',
        day : '',
        reminder: false,
    })

    

    const handleChange = (event) => {
        const {name, value} = event.target;
        setNewTask(prevNewTask => 
            ({...prevNewTask, [name] : value}));
    }

    const handleCheckboxChange = (e) => {
        setNewTask(prevNewTask => ({...prevNewTask, reminder : !prevNewTask.reminder}));
    }

    const handleSubmit= (e) => {
        e.preventDefault();
        addNewTask(newTask);
        setNewTask({
            text : '',
            day : '',
            reminder: false,
        });
    }

    return (
        <form className='add-form' onSubmit={handleSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add Task' value={newTask.text} name='text' onChange={handleChange}/>
            </div>
            
            <div className='form-control'>
                <label>Day & Time</label>
                <input type='text' placeholder='Add Day and Time' value={newTask.day} name='day' onChange={handleChange}/>
            </div>
            
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox' value={newTask.reminder} name='reminder' onChange={handleCheckboxChange}/>
            </div>

            <button className='btn btn-block' type="submit">Save Task</button>
        </form>
    )
}
 AddTask.propTypes = {

}

export default AddTask
