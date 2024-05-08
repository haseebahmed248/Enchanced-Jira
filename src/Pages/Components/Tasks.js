import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Addtask from './Addtask';

const TaskData = ({ taskName, onClose, onAddTaskClick }) => {
  const [taskData, setTaskData] = useState(null);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/users/getTasks/${taskName}`);
        setTaskData(response.data);
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };

    fetchTaskData();
  }, [taskName]);

  if (!taskData) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '1400px',
        maxHeight: '600px',
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        zIndex: 10
      }}
    >
      <IconButton onClick={onClose} sx={{ position: 'absolute', top: '5px', right: '5px', zIndex: 1 }}>
        <CloseIcon sx={{ color: '#d32f2f' }} />
      </IconButton>

      <h2 style={{ textAlign: 'center', color: '#3f51b5' }}>Task Details</h2>

      {taskData.map((task, index) => (
        <div key={task.task_id} style={{ marginBottom: '20px', backgroundColor: '#fff', padding: '10px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>Task ID:</p>
          <p style={{ margin: 0 }}>{task.task_id}</p>
          <p style={{ margin: 0, fontWeight: 'bold' }}>Task Name:</p>
          <p style={{ margin: 0 }}>{task.task_name}</p>
          <p style={{ margin: 0, fontWeight: 'bold' }}>Task Description:</p>
          <p style={{ margin: 0 }}>{task.task_desc}</p>
          <p style={{ margin: 0, fontWeight: 'bold' }}>Assign To:</p>
          <p style={{ margin: 0 }}>{task.username}</p>
        </div>
      ))}

      <Button
        variant="contained"
        onClick={() => setShowAddTask(true)}
        sx={{ marginTop: '20px', width: '100%', backgroundColor: '#3f51b5', color: '#fff' }}
      >
        Add Task
      </Button>

      {showAddTask && (
        <Addtask
          onClose={() => setShowAddTask(false)}
          style={{ marginTop: '20px' }}
        />
      )}
    </Box>
  );
};

export default TaskData;