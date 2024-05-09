// Sidebar.js
import React, { useContext, useState, useEffect } from 'react';
import { Grid, ListItem, List, Typography, Box, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Friends from './Friends';
import ListItemButton from '@mui/material/ListItemButton';
import MessagePanel from './MessagePanel';
import { AccountContext } from './Security/AccountContext';
import { MessageContext } from '../../App';
import axios from 'axios';
import TaskData from './Tasks'; 
import Addtask from './Addtask';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: '5px',
  margin: theme.spacing(1),
  elevation: 3,
}));

export default function Sidebar() {
  const [showAddTask, setShowAddTask] = useState(false);
  const {friends,setFriends} = useContext(AccountContext);
  const [selectedItem, setSelectedItem] = useState("Projects");
  const [open, setOpen] = useState(false); 
  const [friendName, setFriendName] = useState("");
  const [recipientUserId, setRecipientUserId] = useState(null);
  const {orgID,setOrgID} = useContext(MessageContext);
  const [image,setImage]= useState("");
  const [tasks, setTasks] = useState([]); 
  const [selectedTask, setSelectedTask] = useState(null); 
  const [imageUrls, setImageUrls] = useState({});
  const [friendImageUrls, setFriendImageUrls] = useState({});




useEffect(() => {
  const fetchImageUrls = async () => {
    const urls = {};
    for (const friend of friends) {
      try {
        const response = await axios.get(`http://localhost:4003/users/userProfile/${friend.userid}`);
        if (response.status === 200) {
          console.log("user Images: ",response)
          urls[friend.userid] = response.data.rows[0].image_url;
        } else {
          console.log("Image fetch error", response);
        }
      } catch (error) {
        console.error('Error fetching image URL:', error);
      }
    }
    setFriendImageUrls(urls);
  };

  fetchImageUrls();
}, [friends]);

  useEffect(() => {
    if (orgID) {
      console.log("organizationsss",orgID);
      fetchTasks();
    }
  }, [orgID] );

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:4001/organization/getOrgTasks/${orgID}`);
      setTasks(response.data);
      console.log(response.data)
      const urls = {};
      for (const task of response.data) {
        const imgResponse = await axios.get(`http://localhost:4003/users/getImage/${task.u_id}`);
        if (imgResponse.status === 200) {
          if(imgResponse.data.rows[0].image_url !== null){
          urls[task.u_id] = "http://localhost:4003/users/uploads" + imgResponse.data.rows[0].image_url;
          }else{
            urls[task.u_id] = "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg";
          }
          
        } else {
          console.log("image fetch error", imgResponse);
        }
      }
      setImageUrls(urls);

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

  const handleCloseTaskData = () => {
    setSelectedTask(null); 
  };
  
  return (
    <Grid container sx={{ height: "100vh", padding: 2 }}>
    <Grid item xs={12} sm={5} md={3} lg={2}>
        <Item elevation={3} square variant='outlined' sx={{ height: '45%', overflowY: 'auto', marginBottom: 2, borderRadius: '10px' }}>
          <Typography variant="h6">DM's</Typography>
          {friends.map((friend, index) => (
            <Friends  
              key={friend.userid} 
              username={friend.username} 
              image={"http://localhost:4003/uploads"+friendImageUrls[friend.userid]}
              onClick={() => openMessagePanel(friend.username, friend.userid,friendImageUrls[friend.userid])} 
            />
          ))}
        </Item>
        <Item elevation={3} square variant='outlined' sx={{ height: '45%', overflowY: 'auto', borderRadius: '10px' }}>
          <List sx={{ width: '100%' }}>
            <ListItem>
            <ListItemButton
                    sx={{ 
                      borderRadius: 1, 
                      marginBottom: "10px",
                      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 105, 135, .1)',
                      }
                    }}
                    className={selectedItem === 'Projects' ? 'Mui-focusVisible MuiListItemText-dense Mui-selected' : ''}
                    onClick={() => handleItemClick('Projects')}
                  >
                    Projects
                  </ListItemButton>
            </ListItem>
          </List>
        </Item>
      </Grid>
      <Grid item xs={12} sm={7} md={9} lg={10}>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h3" color={'blue'}>Tasks</Typography>
        </Box>
        <Button
            variant="contained"
            onClick={() => setShowAddTask(true)}
            sx={{ marginTop: '20px', width: '10%', backgroundColor: '#3f51b5', color: '#fff' ,
            margin:3
            }}
          >
            Add Task
          </Button>
          {showAddTask && (
            <Addtask
              tasks={tasks}
              setTasks={setTasks}
              onClose={() => setShowAddTask(false)}
              style={{ marginTop: '20px' }}
            />
          )}
        {selectedTask ? (
          <TaskData taskName={selectedTask} onClose={handleCloseTaskData} />
        ) : (
          tasks.map((task) => (
            <ListItemButton
              key={task.task_id}
              sx={{ 
                borderRadius: 1, 
                marginBottom: "10px",
                fontSize:'20px', 
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 105, 135, .1)',
                },
                padding: 2,
                backgroundColor: '#f5f5f5',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onClick={() => handleListItemClick(task.task_name)}
            >
              <Typography variant="body1" sx={{ fontSize: '20px', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis', 
                whiteSpace: 'nowrap' 
                }}>{task.task_name}</Typography>
              <img 
                  style={{width: '40px', height: '40px',borderRadius:50, boxShadow:'0px 0px 5px (0,0,0,0.1)'}}
                  src={imageUrls[task.u_id]}
                />
            </ListItemButton>
          ))
        )}
        <MessagePanel open={open} name={friendName} setOpen={setOpen} recipientUserId={recipientUserId} image={image} />
      </Grid>
    </Grid>
  );
}