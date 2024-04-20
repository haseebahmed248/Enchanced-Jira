import React, { useState } from "react";
import Table from "../Components/Table";
import { Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import '../CSS/AdminDashboard.css'

export default function AdminDashboard(){
    const [selectedItem, setSelectedItem] = useState("Users");

    // Make an item component from organizations ::::::::::::::::::::::::::::::
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    
    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <div className="admin--dashboard--container">
            <Grid container spacing={0}>
                <Grid item xs={12} className="full--grid">
                    <Item style={{borderRadius:'0px', boxShadow:'none', textAlign:'start'}}>
                    <h2 style={{fontSize:'30px'}}> Dash-Board</h2>
                    </Item>
                </Grid>
                <Grid item xs={2}>
                    <Item style={{marginBottom:'10px',borderRadius:'0px',boxShadow:'none'}}>
                        <ul className="admin--dashboard--ul">
                            <li className={selectedItem === "Users" ? "selected" : ""} onClick={() => handleItemClick("Users")}>Users</li>
                            <li className={selectedItem === "Admins" ? "selected" : ""} onClick={() => handleItemClick("Admins")}>Admins</li>
                        </ul>
                    </Item>
                </Grid>
                <Grid item xs={10} sx={{padding:'10px'}}>
                    <Item >
                        <Table />
                    </Item>
                </Grid>
            </Grid>
        </div>
    );
}