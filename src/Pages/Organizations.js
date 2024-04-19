import * as React from 'react';
import { useEffect, useState } from 'react';
import OrgCard from './Components/OrgCard';
import { styled } from '@mui/material/styles';
import NestedList from './Components/NestedList';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './CSS/Organizations.css'

const ORG_URI = "http://localhost:4000/organization/all";


export default function Organizations() {
  const [organizations, setOrganizations] = useState([]);
  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    fetch(ORG_URI)
    .then(response => response.json())
    .then(data => setOrganizations(data))
    .catch(error => console.error(error));
  }, []);

  return (
    <div className='orgContainer'>
    <Grid container spacing={2}>
  <Grid item xs={12} style={{marginLeft:'6%', marginTop:'25px'}}>
    <h2 style={{fontSize:'30px'}}> Avaliable Organizations</h2>
  </Grid>
  <Grid item xs={8}>
    <Item style={{marginBottom:'10px'}}>
      <OrgCard organizations={organizations}/>
    </Item>
  </Grid>
  <Grid item xs={4}>
    <Item >
      <NestedList />
    </Item>
  </Grid>
</Grid>
    </div>
  );

}