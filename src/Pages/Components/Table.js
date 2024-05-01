// import React, { useEffect, useState } from "react";
// import MUIDataTable from "mui-datatables";
// import { createTheme, ThemeProvider, Button } from "@mui/material"; 
// import axios from "axios";
// import EditUser from "./Admin/EditUser";
// import '../CSS/Table.css'

// export default function Table(){
//     const [usersData, setUsersData] = useState([]);
//     const [open, setOpen] = useState(false); // for opening dialog
//     const [currentUser, setCurrentUser] = useState(null);

//     useEffect(() => {
//         axios.get('http://localhost:4000/users/getUsers')
//         .then(res => {
//             setUsersData(res.data);
//         })
//     }, []);
    
//     const options = {
//         filterType: 'checkbox',
//         selectableRows: false,
//         elevation: 0,
//         rowsPerPage: 10,
//         rowsPerPageOptions: [10, 20, 30, 40],
//     };
    
//     const getMuiTheme = () => createTheme({
//         components: {
//             MuiTableCell: {
//                 styleOverrides: {
//                     head: {
//                         padding: "10px 4px"
//                     },
//                     body: {
//                         padding: "7px 15px"
//                     }
//                 }
//             }
//         }
//     });
    
//     const renderOperations = (value, tableMeta, updateValue) => {
//         return (
//             <div className="actions--table--buttons">
//                 <Button variant="contained" color="primary" onClick={() => handleEditButtonClick(tableMeta.rowData)}>
//                     Edit
//                 </Button>
//                 <Button variant="contained" color="error" onClick={() => handleDeleteButtonClick(tableMeta.rowData[0])}>
//                     Delete
//                 </Button>
//             </div>
//         );
//     };
    
//     const handleClose = () => {
//         setOpen(false);
//     };

//     const handleDeleteButtonClick = (userId) => {
//         axios.delete(`http://localhost:4000/users/deleteUser/${userId}`)
//             .then(res => {
//                 console.log("User deleted successfully");
//                 // Update the UI to reflect the changes if needed
//                 setUsersData(usersData.filter(user => user.u_id !== userId));
//             })
//             .catch(error => {
//                 console.error("Error deleting user:", error);
//                 // Handle error
//             });
//     };

//     const handleEditButtonClick = (rowData) => {
//         setCurrentUser(rowData);
//         setOpen(true);
//     };
    
//     const columns = ["u_id","username", "email", "password", "role", "sub","Operations"];
    
//     columns[columns.length - 1] = {
//         name: "Operations",
//         options: {
//             customBodyRender: renderOperations
//         }
//     };

//     return (
//         <React.Fragment>
//             <ThemeProvider theme={getMuiTheme()}>
//                 <MUIDataTable
//                     title={"Users List"}
//                     data={usersData}
//                     columns={columns}
//                     options={options}
//                 />
//             </ThemeProvider>
//             <EditUser 
//                 open={open} 
//                 handleClose={handleClose} 
//                 userId={currentUser ? currentUser[0] : null}
//                 username={currentUser ? currentUser[1] : ''} 
//                 email={currentUser ? currentUser[2] : ''} 
//                 password={currentUser ? currentUser[3] : ''} 
//                 role={currentUser ? currentUser[4] : ''} 
//                 sub={currentUser ? currentUser[5] : ''} 
//             />
//         </React.Fragment>
//     );
// }


import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider, Button } from "@mui/material";
import axios from "axios";
import EditUser from "./Admin/EditUser";
import "../CSS/Table.css";
import { styled } from "@mui/system";

// Using 'styled' to create a custom bold style
const BoldTitle = styled("span")({
    fontWeight: "bold",
    fontSize: "1.5em", // Increase font size
    color: "blue", // Set the color to blue
  });
export default function Table() {
  const [usersData, setUsersData] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/users/getUsers").then((res) => {
      setUsersData(res.data);
    });
  }, []);

  const options = {
    filterType: "checkbox",
    selectableRows: false,
    elevation: 0,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 30, 40],
    responsive: "standard",
  };

  const getMuiTheme = () =>
    createTheme({
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: {
              fontWeight: "bold",
              fontStyle: "italic",
              backgroundColor: "#f5f5f5", 
              color: "#333", 
              borderBottom: "2px solid #ccc", 
              padding: "10px 4px",
              textAlign: "center", 
            },
            body: {
              padding: "10px 15px",
              borderBottom: "1px solid #ddd", 
              backgroundColor: "#fff",
              color: "#333",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
            },
          },
        },
      },
    });

  const renderOperations = (value, tableMeta, updateValue) => (
    <div className="actions--table--buttons">
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleEditButtonClick(tableMeta.rowData)}
        style={{ marginRight: "10px" }}
      >
        Edit
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => handleDeleteButtonClick(tableMeta.rowData[0])}
      >
        Delete
      </Button>
    </div>
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteButtonClick = (userId) => {
    axios
      .delete(`http://localhost:4000/users/deleteUser/${userId}`)
      .then(() => {
        setUsersData(usersData.filter((user) => user.u_id !== userId));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleEditButtonClick = (rowData) => {
    setCurrentUser(rowData);
    setOpen(true);
  };

  const columns = [
    {
      name: "u_id",
      label: <span style={{ fontWeight: "bold", fontStyle: "italic" }}>u_id</span>,
    },
    {
      name: "username",
      label: <span style={{ fontWeight: "bold", fontStyle: "italic" }}>username</span>,
    },
    {
      name: "email",
      label: <span style={{ fontWeight: "bold", fontStyle: "italic" }}>email</span>,
    },
    {
      name: "password",
      label: <span style={{ fontWeight: "bold", fontStyle: "italic" }}>password</span>,
    },
    {
      name: "role",
      label: <span style={{ fontWeight: "bold", fontStyle: "italic" }}>role</span>,
    },
    {
      name: "sub",
      label: <span style={{ fontWeight: "bold", fontStyle: "italic" }}>sub</span>,
    },
    {
      name: "Operations",
      options: {
        customBodyRender: renderOperations,
      },
      label: <span style={{ fontWeight: "bold", fontStyle: "italic" }}>Operations</span>,
    },
  ];

  return (
    <React.Fragment>
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={<BoldTitle>USERS LIST</BoldTitle>}
          data={usersData}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
      <EditUser
        open={open}
        handleClose={handleClose}
        userId={currentUser ? currentUser[0] : null}
        username={currentUser ? currentUser[1] : ""}
        email={currentUser ? currentUser[2] : ""}
        password={currentUser ? currentUser[3] : ""}
        role={currentUser ? currentUser[4] : ""}
        sub={currentUser ? currentUser[5] : ""}
      />
    </React.Fragment>
  );
}
