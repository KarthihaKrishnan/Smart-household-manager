import { useState, useEffect } from 'react';

function TasksCard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/tasks')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');   
        }
        return res.json();
      })
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const handleAddTask = async () => {
    if (!newTask.trim()) return;

    try {
      const response = await fetch('http://localhost:3001/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTask }),
      });   
    const savedTask = await response.json();

    setTasks((prevTasks) => [...prevTasks, savedTask]);
    setNewTask('');
  }
  catch (error) {
    console.error('Error adding task:', error);
  }
  };

  const handleToggleTaskCompletion = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${taskId}`, 
        { method: 'PATCH' }
      );
      const updatedTask = await response.json();

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async(taskId) => {
    try {
      await fetch(`http://localhost:3001/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      setTasks(prevTasks => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  return (
    <div className="tasks-card-container">
      <div className='tasks-card-header'>
        <h3 className='tasks-card-title'>
          Tasks
          <span className='arrow'>&gt;</span> 
        </h3>
        
        <div className='tasks-card-primary-action'>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <input 
                  type="checkbox" 
                  checked={task.completed}
                  onChange={() => handleToggleTaskCompletion(task.id)}
                />
                <span 
                  style={{ 
                    textDecoration: task.completed ? 'line-through' : 'none', 
                    marginLeft: '8px',
                    marginRight: '8px',
                    }}
                >
                  {task.title}
                </span>
                <button onClick={() => handleDeleteTask(task.id)}>🗑️</button> 
              </li> 
            ))}
          </ul> 
        </div>
      </div>

      <div className='tasks-card-body'>
          What needs to be done?
          <input 
          type="text"
          placeholder="Enter a new Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} 
        />
        <button type="button" onClick={handleAddTask}>+ Add</button>
      </div>
    </div>
  );
}

export default TasksCard;