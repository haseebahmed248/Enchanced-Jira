import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function NestedListItem({ primary, image, alt, onClick }) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
    onClick(); // Call the onClick handler when the plus icon is clicked
  };

  return (
    <div>
      <ListItemButton onClick={handleClick} style={{ width: '120%' }}>
        <ListItemAvatar>
          <Avatar alt={alt} src={image} />
        </ListItemAvatar>
        <ListItemText primary={primary} />
        <Fab size="small" color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </ListItemButton>
    </div>
  );
}
