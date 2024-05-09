import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components';

export default function NestedListItem({ primary, image, alt, onClick }) {
  const [open, setOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setOpen(!open);
    onClick(); 
  };
  
  const UserImage = styled(ListItemAvatar)`
    border-radius: 50;
    overflow: hidden;
    width: 50px;
    height: 50px;
  `
  const ItemButton = styled(ListItemButton)`
  width: 150%;
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2),0px 2px 4px 1px rgba(0,0,0,0.2);
  &:hover {
    background-color: #f5f5f5;
    box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
  }
`
  const AddButton = styled(AddIcon)`
    color: '#FFFF';
  `

  const StyledFab = styled(Fab)`
    background-color: #3fFFF;
    &:hover {
      background-color: #303f9f;
    }
  `

  const StyledListItemText = styled(ListItemText)`
    margin-left: 10px;
    color: #3f5322;
    font-weight: bold;
  `

  return (
    <div style={{marginBottom:'20px'}}>
      <ItemButton 
        onClick={handleClick} 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <UserImage>
          <Avatar alt={alt} src={image} />
        </UserImage>
        <StyledListItemText primary={primary} />
        <StyledFab 
          size="small" 
          aria-label="add" 
          style={{
            transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
            opacity: isHovered ? 1 : 0,
            visibility: isHovered ? 'visible' : 'hidden'
          }}
        >
          <AddButton />
        </StyledFab>
      </ItemButton>
    </div>
  );
}