// import React, { useState } from "react";
// import Table from "../Components/Table";
// import { Grid } from "@mui/material";
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
// import '../CSS/AdminDashboard.css'
// import OrganizationCard from "../Components/OrganizationCard";

// export default function AdminDashboard(){
//     const [selectedItem, setSelectedItem] = useState("Users");

//     // Make an item component from organizations ::::::::::::::::::::::::::::::
//     const Item = styled(Paper)(({ theme }) => ({
//         backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//         ...theme.typography.body2,
//         padding: theme.spacing(1),
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//     }));
    
//     const handleItemClick = (item) => {
//         setSelectedItem(item);
//     };

//     return (
//         <div className="admin--dashboard--container">
//             <Grid container spacing={0}>
//                 <Grid item xs={12} className="full--grid">
//                     <Item style={{borderRadius:'0px', boxShadow:'none', textAlign:'start'}}>
//                     <h2 style={{fontSize:'30px'}}> Dash-Board</h2>
//                     </Item>
//                 </Grid>
//                 <Grid item xs={2}>
//                     <Item style={{marginBottom:'10px',borderRadius:'0px',boxShadow:'none'}}>
//                         <ul className="admin--dashboard--ul">
//                             <li className={selectedItem === "Users" ? "selected" : ""} onClick={() =>{ handleItemClick("Users")
//                             setSelectedItem("Users")
//                         }}>Users</li>
//                             <li className={selectedItem === "Admins" ? "selected" : ""} onClick={() =>{ 
//                                 handleItemClick("Admins")
//                                 setSelectedItem("Admins")
//                                 }}>Admins</li>
//                         </ul>
//                     </Item>
//                 </Grid>
//                 <Grid item xs={10} sx={{padding:'10px'}}>
//                     <Item >
//                         {selectedItem === "Users"?
//                         <Table />:<OrganizationCard/>}
//                     </Item>
//                 </Grid>
//             </Grid>
//         </div>
//     );
// }


// import React, { useState } from "react";
// import Table from "../Components/Table";
// import { Grid } from "@mui/material";
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
// import '../CSS/AdminDashboard.css';
// import OrganizationCard from "../Components/OrganizationCard";
// import OrganizationManager from "../Components/OrganizationManager"; // Assuming this component exists

// export default function AdminDashboard() {
//     const [selectedItem, setSelectedItem] = useState("Users");

//     // Styled Item component from MUI Paper
//     const Item = styled(Paper)(({ theme }) => ({
//         backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//         ...theme.typography.body2,
//         padding: theme.spacing(1),
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//     }));

//     const handleItemClick = (item) => {
//         setSelectedItem(item);
//     };

//     return (
//         <div className="admin--dashboard--container">
//             <Grid container spacing={0}>
//                 <Grid item xs={12} className="full--grid">
//                     <Item style={{ borderRadius: '0px', boxShadow: 'none', textAlign: 'start' }}>
//                         <h2 style={{ fontSize: '30px' }}>Dashboard</h2>
//                     </Item>
//                 </Grid>
//                 <Grid item xs={2}>
//                     <Item style={{ marginBottom: '10px', borderRadius: '0px', boxShadow: 'none' }}>
//                         <ul className="admin--dashboard--ul">
//                             <li 
//                                 className={selectedItem === "Users" ? "selected" : ""} 
//                                 onClick={() => handleItemClick("Users")}
//                             >
//                                 Users
//                             </li>
//                             <li 
//                                 className={selectedItem === "Admins" ? "selected" : ""} 
//                                 onClick={() => handleItemClick("Admins")}
//                             >
//                                 Admins
//                             </li>
//                             <li 
//                                 className={selectedItem === "Organization" ? "selected" : ""} 
//                                 onClick={() => handleItemClick("Organization")}
//                             >
//                                 Organization
//                             </li>
//                         </ul>
//                     </Item>
//                 </Grid>
//                 <Grid item xs={10} sx={{ padding: '10px' }}>
//                     <Item>
//                         {selectedItem === "Users" ? (
//                             <Table />
//                         ) : selectedItem === "Admins" ? (
//                             <OrganizationCard />
//                         ) : (
//                             <OrganizationManager /> // Render this when "Organization" is selected
//                         )}
//                     </Item>
//                 </Grid>
//             </Grid>
//         </div>
//     );
// }


import React, { useState } from "react";
import Table from "../Components/Table";
import { Grid, useTheme, useMediaQuery, List, ListItem, ListItemText, Drawer, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import styles from '../CSS/AdminDashboard.css';
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
    }));

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <div className={styles.adminDashboardContainer}>
            <Grid container spacing={matches ? 2 : 0}>
                <Grid item xs={12} className={styles.fullGrid}>
                    <Item>
                        <Typography variant="h4" component="h2">Dashboard</Typography>
                    </Item>
                </Grid>
                <Drawer
                    variant="permanent"
                    open={true}
                    sx={{
                        width: '240px',
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: '240px', boxSizing: 'border-box' },
                    }}
                >
                    <Item>
                        <List component="nav">
                            {["Users", "Admins", "Organization"].map((item) => (
                                <ListItem 
                                    button
                                    key={item}
                                    selected={selectedItem === item}
                                    onClick={() => handleItemClick(item)}
                                    sx={{ bgcolor: selectedItem === item ? 'action.selected' : 'inherit' }}
                                >
                                    <ListItemText primary={item} />
                                </ListItem>
                            ))}
                        </List>
                    </Item>
                </Drawer>
                <Grid item xs={12} sm={10}>
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
        </div>
    );
}