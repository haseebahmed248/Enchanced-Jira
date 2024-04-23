import React, { useState } from 'react';
import { Grid, ListItem, List } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Friends from './Friends';
import ListItemButton from '@mui/material/ListItemButton';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Sidebar() {
  const [selectedItem, setSelectedItem] = useState("Test");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <Grid container sx={{ height: "91.3%" }}>
      <Grid item xs={1.5}>
        <Item elevation={0} square variant='outlined' sx={{ height: '49%', overflow: 'scroll' }}>
          <h2>DM's</h2>
          <Friends image={'./Jira.png'} username={"haseeb"} />
          <Friends image={'./Jira.png'} username={"Customizable Robot"} />
          <Friends username={"Test"} />
        </Item>
        <Item elevation={0} square variant='outlined' sx={{ height: '49%' }}>
          <List sx={{ display: 'block' }}>
            <ListItem sx={{display:'block'}}>
              <ListItemButton
                sx={{ borderRadius: 1, marginBottom: "10px" }}
                className={selectedItem === 'Test' ? 'Mui-focusVisible MuiListItemText-dense Mui-selected' : ''}
                onClick={() => handleItemClick('Test')}
              >
                Test
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
        <Item elevation={0} square sx={{ height: '100%' }}>World</Item>
      </Grid>
    </Grid>
  );
}
