import React, { useContext, useState } from 'react';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import PeopleIcon from '@mui/icons-material/People';
import { SocketContext } from '../Main/Home';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';


const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(6),
    height: theme.spacing(6),
  }));
  
  const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: 'blue',
    borderColor: 'blue',
    boxShadow: theme.shadows[10],
    transition: 'box-shadow 0.3s ease-in-out',
    '&:hover': {
      boxShadow: theme.shadows[30],
    },
  }));

export default function OrganizationMember({ users }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const {socket} = useContext(SocketContext);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log("below is socket");
        console.log(socket)
    };
    
    const handleClose = () => {
        console.log("closing",users);
        setAnchorEl(null);
    };

    const addFriend = (name)=>{
        console.log("emitting");
        console.log(socket)
            socket.emit('add_friend', name,
        ({errorMsg,done})=>{
            if(done){
                handleClose();
                return;
            }
            alert(errorMsg);
        });
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    
    return (
        <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
          <StyledIconButton onClick={handleClick}>
          <PeopleIcon fontSize="large" style={{ color: 'blue' }} />
          </StyledIconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            sx={{ borderRadius: 2, width: { xs: '90%', md: '50%' }, boxShadow: 3 }} 
            elevation={3}
            >
            <List sx={{ 
            padding: 2, 
            backgroundColor: 'white', 
            borderRadius: 2, 
            height: '50vh',
            width:'50wh', 
            overflow: 'auto' 
            }}>
  {users.map((user) => (
  <ListItem 
    key={user.u_id} 
    button 
    sx={{ 
      margin: 1, 
      marginBottom:1, 
      borderRadius: 2, 
      boxShadow: 1, 
      '&:hover': {
        boxShadow: '0 0 10px rgba(0,0,0,0.5)', // Add elevation on hover
      },
    }}
  >
    <ListItemIcon>
      <StyledAvatar alt={user.username} src={"http://localhost:4003/uploads" + user.image_url} />
    </ListItemIcon>
    <ListItemText primary={user.username} />
    <StyledIconButton onClick={() => { addFriend(user.username) }}>
      <ChatIcon />
    </StyledIconButton>
  </ListItem>
))}
</List>
</Popover>
        </Box>
      );
}