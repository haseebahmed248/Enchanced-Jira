import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button'; // Import Button component
import Addtask from './Addtask'; 

const TaskData = ({ taskName, onClose, onAddTaskClick }) => { // Add onAddTaskClick prop
  const [taskData, setTaskData] = useState(null);
  const [showAddTask, setShowAddTask] = useState(false); // State to manage visibility of Addtask component

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/users/getTasks/${taskName}`);
        console.log(response.data); // Log the response data to check its structure
       
        setTaskData(response.data);
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };

    fetchTaskData();
  }, [taskName]);
  console.log("data",taskData);
  if (!taskData) {
    return <div>Loading...</div>;
  }

  // Once taskData is available, you can access its properties
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 'calc(50% - 300px)',
        bottom: 'calc(50% - 300px)',
        right: '20px',
        width: 'calc(100% - 40px)',
        maxWidth: '1400px',
        maxHeight: '600px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        zIndex: 10
      }}
    >
      <IconButton onClick={onClose} sx={{ position: 'absolute', top: '5px', right: '5px', zIndex: 1 }}>
        <CloseIcon />
      </IconButton>

      <h2>Task Details</h2>
      {taskData.map(task => (
    <div key={task.task_id}>
        <p>Task ID: {task.task_id}</p>
        <p>Task Name: {task.task_name}</p>
        <p>Task Description: {task.task_desc}</p>
        <p>Assign To: {task.username}</p>
    </div>
))}

      {/* Add Task Button */}
      <Button variant="contained" onClick={() => setShowAddTask(true)} sx={{ marginTop: '20px' }}>
        Add Task
      </Button>
      
      {/* Render Addtask component if showAddTask state is true */}
      {showAddTask && <Addtask onClose={() => setShowAddTask(false)} />}
    </Box>
  );
};

export default TaskData;
