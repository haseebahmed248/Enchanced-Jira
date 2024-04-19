import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider, Button } from "@mui/material"; 
import axios from "axios";
import EditUser from "./Admin/EditUser";
import '../CSS/Table.css'

export default function Table(){
    const [usersData, setUsersData] = useState([]);
    const [open,setOpen]= useState(false); // for opening dialog
    const [currentUser,setCurrentUser] = useState([]);
    const columns = [{Name:"u_id",options:{
        display:false
    }},"username", "email", "password", "role", "sub","Operations"];
    
    useEffect(() => {
        axios.get('http://localhost:4000/users/getUsers')
        .then(res => {
            setUsersData(res.data);
        })
    }, []);

    const options = {
        filterType: 'checkbox',
        selectableRows: false,
        elevation: 0,
        rowsPerPage: 10,
        rowsPerPageOptions: [10, 20, 30, 40],
    };

    const getMuiTheme = () => createTheme({
        components: {
            MuiTableCell: {
                styleOverrides: {
                    head: {
                        padding: "10px 4px"
                    },
                    body: {
                        padding: "7px 15px"
                    }
                }
            }
        }
    });
    
    const renderOperations = (value, tableMeta, updateValue) => {
        return (
            <div className="actions--table--buttons">
            <Button variant="contained" color="primary" onClick={() => {
                setCurrentUser(null)
                console.log('metadata  table', tableMeta)
                handleEditButtonClick(tableMeta.rowData) 
            }}>
                Edit
            </Button>
            <Button variant="contained" color="error" onClick={()=>{
                handelDeleteButtonClick()
                }}>
                Delete
            </Button>
            </div>
        );
    };
    
    const handleClose = ()=>{
        setOpen(false);
    }
    const handelDeleteButtonClick = ()=>{
        console.log(currentUser)
    }
    const handleEditButtonClick = (rowData) => {
        console.log(currentUser)
        setCurrentUser(rowData)
        setOpen(true);
        console.log("Button clicked for row:", rowData);
    };
    
    // Add custom render function to the "Operations" column
    columns[0] = {
        name:"u_id"
    }
    columns[columns.length - 1] = {
        name: "Operations",
        options: {
            customBodyRender: renderOperations
        }
    };

    return (
        <React.Fragment>
        <ThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
                
                title={"Users List"}
                data={usersData}
                columns={columns}
                options={options}
            />
        </ThemeProvider>
        <EditUser open={open} handleClose={handleClose} 
        username={currentUser[0]? currentUser[0]:''} 
        email={currentUser[1]? currentUser[1]:''} 
        password={currentUser[2]? currentUser[2]:''} 
        role={currentUser[3]? currentUser[3]:''} 
        sub={currentUser[4]? currentUser[4]:''} />
        </React.Fragment>
    );
}
