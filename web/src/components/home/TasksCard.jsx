import { useState } from 'react'

function TasksCard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  function handleAddTask() {
    if (newTask.trim() === '') return;
    
    setTasks([...tasks, newTask.trim()]);
    setNewTask('');
  }

  return (
    <div className="tasks-card-container">
      <div className='tasks-card-header'>
        <h3 className='tasks-card-title'>
          Tasks
          <span className='arrow'>&gt;</span> 
        </h3>
      </div>

      <div className='tasks-card-body'>
          What needs to be done?
      </div>

      <div className='tasks-card-primary-action'>
        <input 
          type="text" 
          placeholder='Enter a new Task'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} 
        />

        <button onClick={handleAddTask}>+ Add</button>

        <ul>
          {tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TasksCard;