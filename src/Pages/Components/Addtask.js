import React, { useState, useEffect, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { MessageContext } from '../../App';
import { Box } from '@mui/system';

const AddTaskComponent = ({ onClose,tasks,setTasks }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const {orgID} = useContext(MessageContext);

  useEffect(() => {
    fetchUsers();
    console.log("users are: ",users)
  }, []);
  
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4003/users/getUsersEmail');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddTask = async () => {
    try {
      if (!selectedUser) {
        console.error('No user selected');
        return;
      }

      console.log('Adding task:', taskName, taskDesc, selectedUser);
      setTasks([...tasks, { task_name: taskName, task_desc: taskDesc, email: selectedUser }])
      await axios.post('http://localhost:4001/organization/insertTask', {
        task_name: taskName,
        task_desc: taskDesc,
        email: selectedUser,
        org_id: orgID
      });
      onClose();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    }}
  >
    <IconButton onClick={onClose} sx={{ alignSelf: 'flex-end' }}> {/* Add this line */}
      <CloseIcon />
    </IconButton>
    <h2>Add Task</h2>
      <TextField
        label="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ marginBottom: '20px' }}
      />
      <TextField
        label="Task Description"
        value={taskDesc}
        onChange={(e) => setTaskDesc(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ marginBottom: '20px' }}
      />
      <Autocomplete
        options={users}
        value={selectedUser}
        onChange={(event, newValue) => setSelectedUser(newValue)}
        renderInput={(params) => <TextField {...params} label="Assigned To" />}
        isOptionEqualToValue={(option, value) => option === value}
        filterOptions={(options, state) => options.filter((option) => option.toLowerCase().includes(state.inputValue.toLowerCase()))}
        fullWidth
        margin="normal"
        sx={{ marginBottom: '20px' }}
      />
      <Button variant="contained" onClick={handleAddTask} sx={{ marginTop: '20px', backgroundColor: '#3f51b5', color: '#fff' }}>
        Save
      </Button>
    </Box>
  );
};

export default AddTaskComponent;