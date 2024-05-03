import * as React from 'react';
import { useEffect, useState } from 'react';
import OrgCard from './Components/OrgCard';
import { styled } from '@mui/material/styles';
import NestedList from './Components/NestedList';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Jira from '../Assets/Logo/Jira.png'
import './CSS/Organizations.css'
import Box from '@mui/material/Box';

const ORG_URI = "http://localhost:4000/organization/all";

export default function Organizations() {
  const [organizations, setOrganizations] = useState([]);
  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius:'8px'
  }));

  useEffect(() => {
    fetch(ORG_URI)
    .then(response => response.json())
    .then(data => setOrganizations(data))
    .catch(error => console.error(error));
  }, []);
  
  return (
    <div className='orgContainer'>
      <Box sx={{  }}>
        <AppBar position="static" style={{ backgroundColor: '#3D52A0', position:'absolute',width: '20%', borderTopRightRadius: '50px', borderBottomRightRadius: '50px', overflow: 'hidden' }}>
          <Toolbar elevation={0}>
            <IconButton edge="start" color="inherit" aria-label="logo">
              <img src={Jira} alt="logo" /> 
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 1, fontSize: '30px', color: 'white', marginTop:'10px' }}> {/* Adjusted fontSize and color */}
              Enhanced Jira
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Item sx={{ height:'100%',backgroundColor:'#E2F0F9' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{marginLeft:'6%', marginTop:'25px'}}>
            <h2 style={{fontSize:'30px'}}> Avaliable Organizations</h2>
          </Grid>
          <Grid item xs={8}>
            <OrgCard organizations={organizations}/>
          </Grid>
          <Grid item xs={4}>
            <Grid container justifyContent="flex-end"> {/* New Grid container */}
              <Item sx={{
                width: '75%',
                marginRight: '0',
              }}>
                <NestedList />
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Item>
    </div>
  );
}