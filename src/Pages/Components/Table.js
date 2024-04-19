import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material";
import axios from "axios";

export default function Table(){
    const [usersData, setUsersData] = useState([]);
    const columns = ["username", "email", "password", "role", "sub"];
    
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
        onRowsDelete: (rowsDeleted) => {
            // Implement deletion logic here
            console.log(rowsDeleted);
        },
        onRowsUpdate: (updatedRows, oldRows) => {
            // Implement row update logic here
            console.log(updatedRows, oldRows);
        },
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

    return (
        <ThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
                title={"Users List"}
                data={usersData}
                columns={columns}
                options={options}
            />
        </ThemeProvider>
    );
}
