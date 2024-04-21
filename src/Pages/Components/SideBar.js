import React from 'react'
import { Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Friends from './Friends';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Sidebar(){
    return (
        <Grid container sx={{height: "91.3%"}}>
        <Grid item xs={1.5}>
            <Item elevation={0} square variant='outlined' sx={{height:'49%', overflow:'scroll'}}> 
                <h2>DM's</h2>
                <Friends image={'./Jira.png'}  username={"haseeb"}/>
                <Friends image={'./Jira.png'}  username={"Customizable Robot"}/>
                <Friends username={"Test"}/>
            </Item>
            <Item elevation={0} square variant='outlined' sx={{height:'49%'}}>
                Hello 2 
            </Item>
            </Grid>
            <Grid item xs={10.5}>
            <Item elevation={0} square sx={{height:'100%'}}>World</Item>
            </Grid>
        </Grid>
    )
}