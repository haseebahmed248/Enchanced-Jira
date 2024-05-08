import React, { useState, useEffect, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import UserContext from './UserContext';
import { MessageContext } from '../../App';

const AddTaskComponent = ({ onClose }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Use null for better control
  // const { org_id } = useContext(UserContext); // Access org_id from UserContext
  const {orgID} = useContext(MessageContext);
  

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/users/getUsersEmail');
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
      
      // Extract email from selectedUser
      //const { email } = selectedUser;

      console.log('Adding task:', taskName, taskDesc, selectedUser); // Log task details

      await axios.post('http://localhost:4000/users/insertTask', {
        task_name: taskName,
        task_desc: taskDesc,
        email: selectedUser, // Pass email as parameter
        org_id: orgID // Pass org_id from UserContext
      });
      onClose(); // Close the add task component after task insertion
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div>
      <h2>Add Task</h2>
      <TextField
        label="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Task Description"
        value={taskDesc}
        onChange={(e) => setTaskDesc(e.target.value)}
        fullWidth
        margin="normal"
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
      />
      <Button variant="contained" onClick={handleAddTask} sx={{ marginTop: '20px' }}>
        Save
      </Button>
    </div>
  );
};

export default AddTaskComponent;
