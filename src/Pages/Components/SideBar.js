// Sidebar.js
import React, { useState, useEffect } from 'react';
import { Grid, ListItem, List } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Friends from './Friends';
import ListItemButton from '@mui/material/ListItemButton';
import MessagePanel from './MessagePanel';
import axios from 'axios'; // Import axios for making HTTP requests
import TaskData from './Tasks'; // Import the TaskData component

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Sidebar() {
  const [selectedItem, setSelectedItem] = useState("Projects");
  const [open, setOpen] = useState(false); 
  const [friendName, setFriendName] = useState(""); 
  const [tasks, setTasks] = useState([]); 
  const [selectedTask, setSelectedTask] = useState(null); 

  useEffect(() => {
    if (organizationId) {
      console.log("organizationsss",organizationId);
      fetchTasks();
    }
  }, [organizationId] );

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/users/getOrgTasks/${organizationId}`);
      setTasks(response.data); // Set tasks state with fetched data
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleItemClick = (taskName) => {
    setSelectedTask(taskName); // Set the selected task
  };

  const openMessagePanel = (name) => {
    setFriendName(name);
    setOpen(true);
  };

  const handleCloseTaskData = () => {
    setSelectedTask(null); // Reset selected task when closing TaskData
  };


  return (
    <Grid container sx={{ height: "91.3%" }}>
      <Grid item xs={1.5}>
        <Item elevation={0} square variant='outlined' sx={{ height: '49%', overflow: 'scroll' }}>
          <h2>DM's</h2>
          <Friends image={'./Jira.png'} username={"haseeb"} onClick={() => openMessagePanel("haseeb")} />
          <Friends image={'./Jira.png'} username={"Customizable Robot"} />
          <Friends username={"Test"} />
        </Item>
        <Item elevation={0} square variant='outlined' sx={{ height: '49%' }}>
          <List sx={{ display: 'block' }}>
            <ListItem sx={{display:'block'}}>
              <ListItemButton
                sx={{ borderRadius: 1, marginBottom: "10px" }}
                className={selectedItem === 'Projects' ? 'Mui-focusVisible MuiListItemText-dense Mui-selected' : ''}
                onClick={() => handleItemClick('Projects')}
              >
                 Projects
              </ListItemButton>
              {tasks.map((task) => (
                <ListItemButton
                  key={task.task_id}
                  sx={{ borderRadius: 1, marginBottom: "10px" }}
                  onClick={() => handleItemClick(task.task_name)}
                >
                  {task.task_name}
                </ListItemButton>
              ))}
            </ListItem>
          </List>
        </Item>
      </Grid>
      <Grid item xs={10.5}>
        {/* Render the TaskData component with the selected task name */}
        {selectedTask && <TaskData taskName={selectedTask} onClose={handleCloseTaskData} />}
        <MessagePanel open={open} name={friendName} setOpen={setOpen} />
      </Grid>
    </Grid>
  );
}
