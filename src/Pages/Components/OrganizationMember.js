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

export default function OrganizationMember({ users }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const {socket} = useContext(SocketContext);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log("below is socket");
        console.log(socket)
    };
    
    const handleClose = () => {
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
        <div style={{position:"absolute", top:"92%", right:'5%'}} >
            <IconButton onClick={handleClick}>
                <PeopleIcon />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                sx={{borderRadius:2}}
                elevation={1}
            >
                <List >
                {users.map((user) => (
                        <ListItem key={user.u_id}>
                            <ListItemIcon>
                                <Avatar alt={user.username} src={user.profilePicture} />
                            </ListItemIcon>
                            <ListItemText sx={{marginRight:5}} primary={user.username} />
                            <IconButton color="primary" onClick={()=>{addFriend(user.username)}}>
                                <ChatIcon />
                            </IconButton>
                        </ListItem>
                        ))}
                </List>
            </Popover>
        </div>
    );
}