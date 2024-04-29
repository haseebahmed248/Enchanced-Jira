
// // // // // // import React, { useEffect, useState } from "react";
// // // // // // import {
// // // // // //   Paper,
// // // // // //   Card,
// // // // // //   CardContent,
// // // // // //   CardMedia,
// // // // // //   Typography,
// // // // // //   CircularProgress,
// // // // // //   Grid,
// // // // // // } from "@mui/material";

// // // // // // const OrganizationManager = () => {
// // // // // //   const [organizations, setOrganizations] = useState([]);
// // // // // //   const [isLoading, setIsLoading] = useState(true);
// // // // // //   const [errorMessage, setErrorMessage] = useState("");

// // // // // //   const fetchOrganizations = async () => {
// // // // // //     try {
// // // // // //       const response = await fetch("/organization/organizations");
// // // // // //       if (response.ok) {
// // // // // //         const data = await response.json();
// // // // // //         setOrganizations(data);
// // // // // //       } else {
// // // // // //         const errorText = await response.text();
// // // // // //         setErrorMessage(`Error: ${errorText}`);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       setErrorMessage("Error fetching organizations.");
// // // // // //     } finally {
// // // // // //       setIsLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     fetchOrganizations();
// // // // // //   }, []); // Effect to fetch data when the component mounts

// // // // // //   const handleAddOrganization = () => {
// // // // // //     // Refresh the list after adding a new organization
// // // // // //     fetchOrganizations();
// // // // // //   };

// // // // // //   return (
// // // // // //     <div>
// // // // // //       {isLoading ? (
// // // // // //         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
// // // // // //           <CircularProgress />
// // // // // //         </div>
// // // // // //       ) : errorMessage ? (
// // // // // //         <Typography color="error" sx={{ marginTop: "16px" }}>
// // // // // //           {errorMessage}
// // // // // //         </Typography>
// // // // // //       ) : (
// // // // // //         <Paper style={{ padding: "16px" }}>
// // // // // //           <Typography variant="h5" gutterBottom>
// // // // // //             List of Organizations
// // // // // //           </Typography>
// // // // // //           <Grid container spacing={3}>
// // // // // //             {organizations.map((org) => (
// // // // // //               <Grid item xs={12} sm={6} md={4} key={org.org_id}>
// // // // // //                 <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
// // // // // //                   {org.image_url && (
// // // // // //                     <CardMedia
// // // // // //                       component="img"
// // // // // //                       style={{ width: '100%', height: 'auto', aspectRatio: '1/1' }}
// // // // // //                       image={org.image_url}
// // // // // //                       alt={`${org.title} image`}
// // // // // //                     />
// // // // // //                   )}
// // // // // //                   <CardContent>
// // // // // //                     <Typography variant="h6">{org.title}</Typography>
// // // // // //                     <Typography variant="body2">{org.description}</Typography>
// // // // // //                   </CardContent>
// // // // // //                 </Card>
// // // // // //               </Grid>
// // // // // //             ))}
// // // // // //           </Grid>
// // // // // //         </Paper>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default OrganizationManager;


// // // // // import React, { useEffect, useState } from "react";
// // // // // import {
// // // // //   Paper,
// // // // //   Card,
// // // // //   CardContent,
// // // // //   CardMedia,
// // // // //   Typography,
// // // // //   CircularProgress,
// // // // //   Grid,
// // // // //   Button,
// // // // // } from "@mui/material";

// // // // // const OrganizationManager = () => {
// // // // //   const [organizations, setOrganizations] = useState([]); // Initialize with an empty array
// // // // //   const [selectedOrganization, setSelectedOrganization] = useState(null);
// // // // //   const [isLoading, setIsLoading] = useState(true);
// // // // //   const [errorMessage, setErrorMessage] = useState("");

// // // // //   const fetchOrganizations = async () => {
// // // // //     console.log("calling")
// // // // //     setIsLoading(true);
// // // // //     try {
// // // // //         console.log("fetch")
// // // // //       const response = await fetch("/organization/organizations");
// // // // //       console.log("organizations",response)
// // // // //       if (response.ok) {
// // // // //         const data = await response.json();
// // // // //         console.log("org data",data)
// // // // //         setOrganizations(data);
// // // // //       } else {
// // // // //         const errorText = await response.text();
// // // // //         setErrorMessage(`Error: ${errorText}`);
// // // // //       }
// // // // //     } catch (error) {
// // // // //       setErrorMessage("Error fetching organizations.");
// // // // //     } finally {
// // // // //       setIsLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const fetchOrganizationDetails = async (org_id) => {
// // // // //     setIsLoading(true);
// // // // //     try {
// // // // //       const response = await fetch(`organization/organization-details/${org_id}`);
// // // // //       if (response.ok) {
// // // // //         const data = await response.json();
// // // // //         setSelectedOrganization(data);
// // // // //       } else {
// // // // //         const errorText = await response.text();
// // // // //         setErrorMessage(`Error: ${errorText}`);
// // // // //       }
// // // // //     } catch (error) {
// // // // //       setErrorMessage("Error fetching organization details.");
// // // // //     } finally {
// // // // //       setIsLoading(false);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     console.log("data",organizations)
// // // // //     fetchOrganizations();
// // // // //   }, []); // Effect to fetch data when the component mounts

// // // // //   return (
// // // // //     <div>
// // // // //       {isLoading ? (
// // // // //         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
// // // // //           <CircularProgress />
// // // // //         </div>
// // // // //       ) : errorMessage ? (
// // // // //         <Typography color="error" sx={{ marginTop: "16px" }}>
// // // // //           {errorMessage}
// // // // //         </Typography>
// // // // //       ) : selectedOrganization ? (
// // // // //         <Paper style={{ padding: "16px" }}>
// // // // //           <Typography variant="h5">{selectedOrganization.organization_name}</Typography>
// // // // //           <Typography variant="h6">Number of Users: {selectedOrganization.number_of_users}</Typography>
// // // // //           <Typography variant="h6">Users:</Typography>
// // // // //           <ul>
// // // // //             {(selectedOrganization.users || []).map((user, index) => (
// // // // //               <li key={index}>{user}</li>
// // // // //             ))}
// // // // //           </ul>
// // // // //           <Button onClick={() => setSelectedOrganization(null)}>Back to List</Button>
// // // // //         </Paper>
// // // // //       ) : (
// // // // //         <Paper style={{ padding: "16px" }}>
// // // // //           <Typography variant="h5" gutterBottom>
// // // // //             List of Organizations
// // // // //           </Typography>
// // // // //           <Grid container spacing={3}>
// // // // //             {(organizations || []).map((org) => (
// // // // //               <Grid item xs={12} sm={6} md={4} key={org.org_id}>
// // // // //                 <Card
// // // // //                   style={{ display: "flex", flexDirection: "column", height: "100%" }}
// // // // //                   onClick={() => fetchOrganizationDetails(org.org_id)}
// // // // //                 >
// // // // //                   {org.image_url && (
// // // // //                     <CardMedia
// // // // //                       component="img"
// // // // //                       style={{ width: "100%", height: "auto", aspectRatio: "1/1" }}
// // // // //                       image={org.image_url}
// // // // //                       alt={`${org.title} image`}
// // // // //                     />
// // // // //                   )}
// // // // //                   <CardContent>
// // // // //                     <Typography variant="h6">{org.title}</Typography>
// // // // //                   </CardContent>
// // // // //                 </Card>
// // // // //               </Grid>
// // // // //             ))}
// // // // //           </Grid>
// // // // //         </Paper>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default OrganizationManager;
// // // import React, { useEffect, useState } from 'react';
// // // import {
// // //   Paper,
// // //   Card,
// // //   CardContent,
// // //   CardMedia,
// // //   Typography,
// // //   CircularProgress,
// // //   Grid,
// // //   Button,
// // // } from '@mui/material';

// // // const OrganizationManager = () => {
// // //   const [organizations, setOrganizations] = useState([]); // Initialize with an empty array
// // //   const [selectedOrganization, setSelectedOrganization] = useState(null);
// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const [errorMessage, setErrorMessage] = useState('');

// // //   const fetchOrganizations = async () => {
// // //     setIsLoading(true);
// // //     try {
// // //       const response = await fetch('/organization/organizations');
// // //       if (response.ok) {
// // //         const data = await response.json();
// // //         setOrganizations(data);
// // //       } else {
// // //         const errorText = await response.text();
// // //         setErrorMessage(`Error: ${errorText}`);
// // //       }
// // //     } catch (error) {
// // //       setErrorMessage('Error fetching organizations.');
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const fetchOrganizationDetails = async (org_id) => {
// // //     setIsLoading(true);
// // //     try {
// // //       const response = await fetch(`/organization/organization-details/${org_id}`);
// // //       if (response.ok) {
// // //         const data = await response.json();
// // //         setSelectedOrganization(data);
// // //       } else {
// // //         const errorText = await response.text();
// // //         setErrorMessage(`Error: ${errorText}`);
// // //       }
// // //     } catch (error) {
// // //       setErrorMessage('Error fetching organization details.');
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchOrganizations(); // Fetch data when the component mounts
// // //   }, []); // Effect dependency array left empty to run only once on component mount

// // //   return (
// // //     <div>
// // //       {isLoading ? (
// // //         <div
// // //           style={{
// // //             display: 'flex',
// // //             justifyContent: 'center',
// // //             alignItems: 'center',
// // //             height: '100vh',
// // //           }}
// // //         >
// // //           <CircularProgress />
// // //         </div>
// // //       ) : errorMessage ? (
// // //         <Typography color="error" sx={{ marginTop: '16px' }}>
// // //           {errorMessage}
// // //         </Typography>
// // //       ) : selectedOrganization ? (
// // //         <Paper style={{ padding: '16px' }}>
// // //           <Typography variant="h5">{selectedOrganization.organization_name}</Typography>
// // //           <Typography variant="h6">Number of Users: {selectedOrganization.number_of_users}</Typography>
// // //           <Typography variant="h6">Users:</Typography>
// // //           <ul>
// // //             {(selectedOrganization.users || []).map((user, index) => (
// // //               <li key={index}>{user}</li>
// // //             ))}
// // //           </ul>
// // //           <Button onClick={() => setSelectedOrganization(null)}>Back to List</Button>
// // //         </Paper>
// // //       ) : (
// // //         <Paper style={{ padding: '16px' }}>
// // //           <Typography variant="h5" gutterBottom>
// // //             List of Organizations
// // //           </Typography>
// // //           <Grid container spacing={3}>
// // //             {(organizations || []).map((org) => (
// // //               <Grid item xs={12} sm={6} md={4} key={org.org_id}>
// // //                 <Card
// // //                   style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
// // //                   onClick={() => fetchOrganizationDetails(org.org_id)}
// // //                 >
// // //                   {org.image_url && (
// // //                     <CardMedia
// // //                       component="img"
// // //                       style={{ width: '100%', height: 'auto', aspectRatio: '1/1' }}
// // //                       image={org.image_url}
// // //                       alt={`${org.title} image`}
// // //                     />
// // //                   )}
// // //                   <CardContent>
// // //                     <Typography variant="h6">{org.title}</Typography>
// // //                   </CardContent>
// // //                 </Card>
// // //               </Grid>
// // //             ))}
// // //           </Grid>
// // //         </Paper>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default OrganizationManager;

// import React, { useEffect, useState } from 'react';
// import {
//   Paper,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   CircularProgress,
//   Grid,
//   Button,
//   Checkbox,
//   FormControlLabel,
//   FormGroup,
// } from '@mui/material';

// const OrganizationManager = () => {
//   const [organizations, setOrganizations] = useState([]);
//   const [orgId,setOrgId] = useState(null);
//   const [selectedOrganization, setSelectedOrganization] = useState(null);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState('');

//   const fetchOrganizations = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch('/organization/organizations');
//       if (response.ok) {
//         const data = await response.json();
//         setOrganizations(data);
//       } else {
//         const errorText = await response.text();
//         setErrorMessage(`Error fetching organizations: ${errorText}`);
//       }
//     } catch (error) {
//       setErrorMessage('Error fetching organizations.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchOrganizationDetails = async (org_id) => {
//     setIsLoading(true);
//     setErrorMessage('');
//     try {
//       const response = await fetch(`/organization/organization-details/${org_id}`);
//       if (response.ok) {
//         const data = await response.json();
//         console.log("Oraganization id is :"+org_id);
//         console.log(data)
//         setSelectedOrganization(data);
//         setOrgId(org_id);
//       } else {
//         const errorText = await response.text();
//         setErrorMessage(`Error fetching organization details: ${errorText}`);
//       }
//     } catch (error) {
//       setErrorMessage(`Error fetching organization details: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleUserSelection = (userId) => {
//     setSelectedUsers((prevSelectedUsers) => {
//       // Toggle the user ID in the selection array
//       if (prevSelectedUsers.includes(userId)) {
//         return prevSelectedUsers.filter((id) => id !== userId); // Deselect if already selected
//       }
//       return [...prevSelectedUsers, userId]; // Select if not already selected
//     });
//   };
  

//   const handleDeleteUsers = async () => {
//     if (selectedUsers.length === 0) {
//       setErrorMessage('No users selected for deletion.');
//       return;
//     }
  
//     const errors = [];
  
//     // Assuming 'selectedUsers' contains user IDs to delete
//     for (const userId of selectedUsers) {
//       try {
//         const response = await fetch(
//           `/organization/${orgId}/user/${userId}`, // Correct endpoint with orgId and userId
//           {
//             method: 'DELETE',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           }
//         );
  
//         if (!response.ok) {
//           const errorText = await response.text();
//           errors.push(`Error deleting user ${userId}: ${errorText}`);
//         }
//       } catch (error) {
//         errors.push(`Error deleting user ${userId}: ${error.message}`);
//       }
//     }
  
//     if (errors.length > 0) {
//       setErrorMessage(errors.join(', '));
//     } else {
//       // Refresh organization data after deletion
//       await fetchOrganizationDetails(orgId);
//       // Clear selected users
//       setSelectedUsers([]);
//       // Clear error messages
//       setErrorMessage('');
//     }
//   };
  
//   useEffect(() => {
//     fetchOrganizations();
//   }, []); // Fetch organizations once when component mounts

//   const handleCardClick = (org_id) => {
//     fetchOrganizationDetails(org_id);
//   };

//   return (
//     <div>
//       {isLoading ? (
//         <div
//           style={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             height: '100vh',
//           }}
//         >
//           <CircularProgress />
//         </div>
//       ) : errorMessage ? (
//         <Typography color="error" sx={{ marginTop: '16px' }}>
//           {errorMessage}
//         </Typography>
//       ) : selectedOrganization ? (
//         <Paper style={{ padding: '16px' }}>
//           <Typography variant="h5">{selectedOrganization.organization_name}</Typography>
//           <Typography variant="h6">Number of Users: {selectedOrganization.number_of_users}</Typography>
//           <Typography variant="h6">Users:</Typography>
//           <FormGroup>
//             {(selectedOrganization.users || []).map((user, index) => (
//               <FormControlLabel
//                 key={index}
//                 control={
//                   <Checkbox
//                     checked={selectedUsers.includes(user)}
//                     onChange={() => handleUserSelection(user)}
//                   />
//                 }
//                 label={user}
//               />
//             ))}
//           </FormGroup>
//           <Button onClick={handleDeleteUsers} color="error">
//             Delete Selected Users
//           </Button>
//           <Button onClick={() => setSelectedOrganization(null)}>Back to List</Button>
//         </Paper>
//       ) : (
//         <Paper style={{ padding: '16px' }}>
//           <Typography variant="h5" gutterBottom>
//             List of Organizations
//           </Typography>
//           <Grid container spacing={3}>
//             {(organizations || []).map((org) => (
//               <Grid item xs={12} sm={6} md={4} key={org.org_id}>
//                 <Card
//                   style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
//                   onClick={() => handleCardClick(org.org_id)} // Fetch organization details on card click
//                 >
//                   {org.image_url && (
//                     <CardMedia
//                       component="img"
//                       style={{ width: '100%', height: 'auto', aspectRatio: '1/1' }}
//                       image={org.image_url}
//                       alt={`${org.title} image`}
//                     />
//                   )}
//                   <CardContent>
//                     <Typography variant="h6">{org.title}</Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Paper>
//       )}
//     </div>
//   );
// };

// export default OrganizationManager;

// OrganizationManager.js
import React, { useEffect, useState } from 'react';
import {
  Paper,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import SnackbarMessage from './SnackbarComponent'; // Importing Snackbar component

const OrganizationManager = () => {
  const [organizations, setOrganizations] = useState([]);
  const [orgId, setOrgId] = useState(null);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState(''); // For snackbar messages
  const [snackbarOpen, setSnackbarOpen] = useState(false); // For controlling snackbar visibility

  const fetchOrganizations = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/organization/organizations');
      if (response.ok) {
        const data = await response.json();
        setOrganizations(data);
      } else {
        const errorText = await response.text();
        setErrorMessage(`Error fetching organizations: ${errorText}`);
      }
    } catch (error) {
      setErrorMessage('Error fetching organizations.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrganizationDetails = async (org_id) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch(`/organization/organization-details/${org_id}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedOrganization(data);
        setOrgId(org_id);
      } else {
        const errorText = await response.text();
        setErrorMessage(`Error fetching organization details: ${errorText}`);
      }
    } catch (error) {
      setErrorMessage(`Error fetching organization details: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserSelection = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      // Toggle the user ID in the selection array
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      }
      return [...prevSelectedUsers, userId];
    });
  };

  const handleDeleteUsers = async () => {
    if (selectedUsers.length === 0) {
      setSnackbarMessage('No users selected for deletion.');
      setSnackbarOpen(true);
      return;
    }

    const errors = [];

    for (const userId of selectedUsers) {
      try {
        const response = await fetch(
          `/organization/${orgId}/user/${userId}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          errors.push(`Error deleting user ${userId}: ${errorText}`);
        }
      } catch (error) {
        errors.push(`Error deleting user ${userId}: ${error.message}`);
      }
    }

    if (errors.length > 0) {
      setSnackbarMessage(errors.join(', '));
      setSnackbarOpen(true);
    } else {
      await fetchOrganizationDetails(orgId);
      setSelectedUsers([]);
      setSnackbarMessage('Selected users deleted successfully.');
      setSnackbarOpen(true);
    }
  };

  const handleCardClick = (org_id) => {
    fetchOrganizationDetails(org_id);
  };

  useEffect(() => {
    fetchOrganizations();
  }, []); // Fetch organizations once when component mounts

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </div>
      ) : errorMessage ? (
        <Typography color="error" sx={{ marginTop: '16px' }}>
          {errorMessage}
        </Typography>
      ) : selectedOrganization ? (
        <Paper style={{ padding: '16px' }}>
          <Typography variant="h5">{selectedOrganization.organization_name}</Typography>
          <Typography variant="h6">Number of Users: {selectedOrganization.number_of_users}</Typography>
          <Typography variant="h6">Users:</Typography>
          <FormGroup>
            {(selectedOrganization.users || []).map((user, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={selectedUsers.includes(user)}
                    onChange={() => handleUserSelection(user)}
                  />
                }
                label={user}
              />
            ))}
          </FormGroup>
          <Button onClick={handleDeleteUsers} color="error">
            Delete Selected Users
          </Button>
          <Button onClick={() => setSelectedOrganization(null)}>Back to List</Button>
        </Paper>
      ) : (
        <Paper style={{ padding: '16px' }}>
          <Typography variant="h5" gutterBottom>
            List of Organizations
          </Typography>
          <Grid container spacing={3}>
            {(organizations || []).map((org) => (
              <Grid item xs={12} sm={6} md={4} key={org.org_id}>
                <Card
                  style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                  onClick={() => handleCardClick(org.org_id)} // Fetch organization details on card click
                >
                  {org.image_url && (
                    <CardMedia
                      component="img"
                      style={{ width: '100%', height: 'auto', aspectRatio: '1/1' }}
                      image={org.image_url}
                      alt={`${org.title} image`}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6">{org.title}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
      <SnackbarMessage
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </div>
  );
};

export default OrganizationManager;
