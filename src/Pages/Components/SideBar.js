// Sidebar.js
import React, { useContext, useState } from 'react';
import { Grid, ListItem, List } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Friends from './Friends';
import ListItemButton from '@mui/material/ListItemButton';
import MessagePanel from './MessagePanel';
import { AccountContext } from './Security/AccountContext';

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
  const [image,setImage]= useState("");
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  
  const openMessagePanel = (name,userId,image) => {
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
              <ListItemButton
                sx={{ borderRadius: 1, marginBottom: "10px" }}
                className={selectedItem === 'Test2' ? 'Mui-focusVisible MuiListItemText-dense Mui-selected' : ''}
                onClick={() => handleItemClick('Test2')}
              >
                Test2
              </ListItemButton>
              <ListItemButton
                sx={{ borderRadius: 1, marginBottom: "10px" }}
                className={selectedItem === 'Test3' ? 'Mui-focusVisible MuiListItemText-dense Mui-selected' : ''}
                onClick={() => handleItemClick('Test3')}
              >
                Test3
              </ListItemButton>
            </ListItem>
          </List>
        </Item>
      </Grid>
      <Grid item xs={10.5}>
        <MessagePanel open={open} name={friendName} setOpen={setOpen} recipientUserId={recipientUserId} image={image} />
      </Grid>
    </Grid>
  );
}