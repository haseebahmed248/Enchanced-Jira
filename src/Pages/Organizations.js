import * as React from 'react';
import { useEffect, useState } from 'react';
import OrgCard from './Components/OrgCard';
import NestedList from './Components/NestedList';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Jira from '../Assets/Logo/Jira.png';
import './CSS/Organizations.css';

const ORG_URI = "http://localhost:4001/organization/all";

export default function Organizations() {
  const [organizations, setOrganizations] = useState([]);
  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: '12px',
  }));

  useEffect(() => {
    fetch(ORG_URI)
      .then((response) => response.json())
      .then((data) => setOrganizations(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="orgContainer">
      <AppBar
        position="static"
        style={{
          backgroundColor: '#3D52A0',
          borderTopRightRadius: '50px',
          borderBottomRightRadius: '50px',
          overflow: 'hidden',
        }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="logo">
            <img src={Jira} alt="logo" style={{ height: '40px' }} />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1, fontSize: '30px', color: 'white' }}>
            Enhanced Jira
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3, height: '100%' }}>
        <Grid container spacing={3}> 
          <Grid item xs={12} md={4}> 
            <Item sx={{ minHeight: '300px', padding: '16px' }}>
              <div style={{ overflowY: 'auto', height: '300px', paddingLeft: '16px', paddingRight: '16px' }}>
                <Typography variant="h5" gutterBottom>
                  Organization Structure
                </Typography>
                <NestedList />
              </div>
            </Item>
          </Grid>
          <Grid item xs={12} md={8}>
            <Item sx={{ minHeight: '300px',height:'85vh', padding: '16px' }}>
              <Typography variant="h4" gutterBottom mt={5}>
                Available Organizations
              </Typography>
              <OrgCard organizations={organizations} />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}