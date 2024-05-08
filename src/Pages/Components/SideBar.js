// Sidebar.js
import React, { useContext, useState,useEffect } from 'react';
import { Grid, ListItem, List } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Friends from './Friends';
import ListItemButton from '@mui/material/ListItemButton';
import MessagePanel from './MessagePanel';
import { AccountContext } from './Security/AccountContext';
import { MessageContext } from '../../App';
import axios from 'axios';
import TaskData from './Tasks'; 


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Sidebar() {
  
  const {friends,setFriends} = useContext(AccountContext);
  const [selectedItem, setSelectedItem] = useState("Projects");
  const [open, setOpen] = useState(false); // State for opening message panel
  const [friendName, setFriendName] = useState(""); // State for storing friend name
  const [recipientUserId, setRecipientUserId] = useState(null);
  const {orgID,setOrgID} = useContext(MessageContext);
  const [image,setImage]= useState("");
  const [tasks, setTasks] = useState([]); 
  const [selectedTask, setSelectedTask] = useState(null); 
  

  useEffect(() => {
    if (orgID) {
      console.log("organizationsss",orgID);
      fetchTasks();
    }
  }, [orgID] );

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:4003/users/getOrgTasks/${orgID}`);  //${selectedOrgId.id}
      setTasks(response.data); // Set tasks state with fetched data
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  const handleListItemClick = (task_name)=>{
    setSelectedTask(task_name);
  }
  const handleCloseTaskData = () => {
    setSelectedTask(null); // Reset selected task when closing TaskData
  };
  
  const openMessagePanel = (name,userId,image) => {
    console.log("Organization Id is :", orgID)
    setFriendName(name);
    setRecipientUserId(userId);
    setImage("http://localhost:4003/uploads"+image);
    console.log("Image url is : ", image);
    console.log("Friend id is :"+ userId);
    console.log("Friends are: ", friends);
    setOpen(true);
  };

  return (
    <Grid container sx={{ height: "91.3%" }}>
      <Grid item xs={1.5}>
        <Item elevation={0} square variant='outlined' sx={{ height: '49%', overflow: 'scroll' }}>
          <h2>DM's</h2>
          {friends.map((friend, index) => (
            <Friends  
              key={friend.userid} 
              username={friend.username} 
              image={friend.image_url}
              onClick={() => openMessagePanel(friend.username, friend.userid,friend.image_url)} 
            />
          ))}
          
          {/* <Friends image={'./Jira.png'} username={"haseeb"} onClick={() => openMessagePanel("haseeb")} />
          <Friends image={'./Jira.png'} username={"Customizable Robot"} />
          <Friends username={"Test"} /> */}
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
                  onClick={() => handleListItemClick(task.task_name)}
                >
                  {task.task_name}
                </ListItemButton>
              ))}
            </ListItem>
          </List>
        </Item>
      </Grid>
      <Grid item xs={10.5}>
      {selectedTask && <TaskData taskName={selectedTask} onClose={handleCloseTaskData} />}
        <MessagePanel open={open} name={friendName} setOpen={setOpen} recipientUserId={recipientUserId} image={image} />
      </Grid>
    </Grid>
  );
}