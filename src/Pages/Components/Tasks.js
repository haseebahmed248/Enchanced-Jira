import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, IconButton, Button, Paper, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const TaskData = ({ taskName, onClose, onAddTaskClick }) => {
  const [taskData, setTaskData] = useState(null);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/organization/getTasks/${taskName}`);
        setTaskData(response.data);
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };

    fetchTaskData();
  }, [taskName]);

  if (!taskData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%', // Reduced width
        maxWidth: '500px', // Reduced max width
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

      <Typography variant="h4" align="center" color="primary" sx={{ marginBottom: '20px' }}>Task Details</Typography>

      {taskData.map((task, index) => (
        <Paper key={task.task_id} sx={{ marginBottom: '20px', padding: '10px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <Grid container spacing={2}>
            <Grid item xs={5}><Typography variant="h6">Task ID:</Typography></Grid>
            <Grid item xs={5}><Typography>{task.task_id}</Typography></Grid>
            <Grid item xs={5}><Typography variant="h6">Task Name:</Typography></Grid>
            <Grid item xs={5}><Typography>{task.task_name}</Typography></Grid>
            <Grid item xs={5}><Typography variant="h6">Task Description:</Typography></Grid>
            <Grid item xs={5}><Typography>{task.task_desc}</Typography></Grid>
            <Grid item xs={5}><Typography variant="h6">Assign To:</Typography></Grid>
            <Grid item xs={5}><Typography>{task.username}</Typography></Grid>
          </Grid>
        </Paper>
      ))}
      
    </Box>
  );
};

export default TaskData;