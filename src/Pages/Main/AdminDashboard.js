import React, { useState } from "react";
import Table from "../Components/Table";
import { AppBar, Toolbar, Typography, Grid, useTheme, useMediaQuery, List, ListItem, ListItemText, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import OrganizationCard from "../Components/OrganizationCard";
import OrganizationManager from "../Components/OrganizationManager";

export default function AdminDashboard() {
    const [selectedItem, setSelectedItem] = useState("Users");
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)', // Custom box shadow
    }));

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Dashboard
                </Typography>
            </Toolbar>
        </AppBar>
        <Grid container spacing={matches ? 2 : 0} sx={{ marginTop: '64px' }}>
                <Grid item xs={2}>
                    <Box sx={{ marginTop: '64px' }}>
                        <Item elevation={4} sx={{ height:'40%' }}>
                            <List component="nav">
                                {["Users", "Admins", "Organization"].map((item) => (
                                    <ListItem 
                                        button
                                        key={item}
                                        selected={selectedItem === item}
                                        onClick={() => handleItemClick(item)}
                                        sx={{ 
                                            bgcolor: selectedItem === item ? 'action.selected' : 'inherit',
                                            '&:hover': {
                                                backgroundColor: theme.palette.action.hover,
                                                transition: '0.3s'
                                            }
                                        }}
                                    >
                                        <ListItemText primary={item} />
                                    </ListItem>
                                ))}
                            </List>
                        </Item>
                    </Box>
                </Grid>
                <Grid item xs={10}>
                    <Item>
                        {selectedItem === "Users" ? (
                            <Table />
                        ) : selectedItem === "Admins" ? (
                            <OrganizationCard />
                        ) : (
                            <OrganizationManager />
                        )}
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}