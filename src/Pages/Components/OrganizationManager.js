

// // // export default OrganizationManager;
// // import React, { useEffect, useState } from 'react';
// // import {
// //   Paper,
// //   Card,
// //   CardContent,
// //   CardMedia,
// //   Typography,
// //   CircularProgress,
// //   Grid,
// //   Button,
// //   Checkbox,
// //   FormControlLabel,
// //   FormGroup,
// //   CardActionArea,
// //   CardActions,
// // } from '@mui/material';
// // import { styled } from '@mui/material/styles';
// // import { blueGrey } from '@mui/material/colors';
// // import SnackbarMessage from './SnackbarComponent';

// // const ColorButton = styled(Button)(({ theme }) => ({
// //   color: theme.palette.getContrastText(blueGrey[500]),
// //   backgroundColor: blueGrey[900],
// //   '&:hover': {
// //     backgroundColor: blueGrey[700],
// //   },
// // }));

// // const OrganizationManager = () => {
// //   const [organizations, setOrganizations] = useState([]);
// //   const [orgId, setOrgId] = useState(null);
// //   const [selectedOrganization, setSelectedOrganization] = useState(null);
// //   const [selectedUserIds, setSelectedUserIds] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [errorMessage, setErrorMessage] = useState('');
// //   const [snackbarMessage, setSnackbarMessage] = useState('');
// //   const [snackbarOpen, setSnackbarOpen] = useState(false);

// //   const fetchOrganizations = async () => {
// //     setIsLoading(true);
// //     try {
// //       const response = await fetch('http://localhost:4000/organization/organizations');
// //       if (response.ok) {
// //         const data = await response.json();
// //         setOrganizations(data);
// //       } else {
// //         const errorText = await response.text();
// //         setErrorMessage(`Error fetching organizations: ${errorText}`);
// //       }
// //     } catch (error) {
// //       setErrorMessage('Error fetching organizations.');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const fetchOrganizationDetails = async (orgId) => {
// //     setIsLoading(true);
// //     setErrorMessage('');
// //     try {
// //       const response = await fetch(
// //         `http://localhost:4000/organization/organization-details/${orgId}`
// //       );
// //       if (response.ok) {
// //         const data = await response.json();
// //         setSelectedOrganization(data);
// //         setOrgId(orgId);
// //       } else {
// //         const errorText = await response.text();
// //         setErrorMessage(`Error fetching organization details: ${errorText}`);
// //       }
// //     } catch (error) {
// //       setErrorMessage(`Error fetching organization details: ${error.message}`);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleUserSelection = (userId) => {
// //     setSelectedUserIds((prevSelectedUserIds) => {
// //       if (prevSelectedUserIds.includes(userId)) {
// //         return prevSelectedUserIds.filter((id) => id !== userId);
// //       }
// //       return [...prevSelectedUserIds, userId];
// //     });
// //   };

// //   const handleDeleteUsers = async () => {
// //     if (selectedUserIds.length === 0) {
// //       setSnackbarMessage('No users selected for deletion.');
// //       setSnackbarOpen(true);
// //       return;
// //     }

// //     const errors = [];

// //     for (const userId of selectedUserIds) {
// //       try {
// //         const response = await fetch(
// //           `http://localhost:4000/organization/deleteUser/${orgId}/user/${userId}`,
// //           {
// //             method: 'DELETE',
// //             headers: {
// //               'Content-Type': 'application/json',
// //             },
// //           }
// //         );

// //         if (!response.ok) {
// //           const errorText = await response.text();
// //           errors.push(`Error deleting user ${userId}: ${errorText}`);
// //         }
// //       } catch (error) {
// //         errors.push(`Error deleting user ${userId}: ${error.message}`);
// //       }
// //     }

// //     if (errors.length > 0) {
// //       setSnackbarMessage(errors.join(', '));
// //       setSnackbarOpen(true);
// //     } else {
// //       await fetchOrganizationDetails(orgId);
// //       setSelectedUserIds([]);
// //       setSnackbarMessage('Selected users deleted successfully.');
// //       setSnackbarOpen(true);
// //     }
// //   };

// //   const handleCardClick = (orgId) => {
// //     fetchOrganizationDetails(orgId);
// //   };

// //   useEffect(() => {
// //     fetchOrganizations();
// //   }, []);

// //   const handleSnackbarClose = () => {
// //     setSnackbarOpen(false);
// //   };

// //   return (
// //     <div>
// //       {isLoading ? (
// //         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
// //           <CircularProgress />
// //         </div>
// //       ) : errorMessage ? (
// //         <Typography color="error" sx={{ marginTop: '16px' }}>
// //           {errorMessage}
// //         </Typography>
// //       ) : selectedOrganization ? (
// //         <Paper style={{ padding: '16px' }}>
// //           <Typography variant="h5"
// //            sx={{
// //             border: '1px solid black', // Border around the text
// //             padding: '8px', // Padding inside the border
// //             fontStyle: 'italic',
// //             fontWeight: 'bold',
// //             fontSize:"40px"
// //              // Italic text style
// //           }}>{selectedOrganization.organization_name}</Typography>
// //           <Typography variant="h6"
// //            sx={{
// //             // Border around the text
// //             padding: '8px', // Padding inside the border
            
          
// //             fontWeight: 'bold',
// //             fontSize:"15px"
// //              // Italic text style
// //           }}>Number of Users: {selectedOrganization.number_of_users}</Typography>
// //           <Typography variant="h6"
// //            sx={{
           
           
// //             textAlign: 'left',
// //             fontWeight: 'bold',
// //             fontSize:"20px"
// //              // Italic text style
// //           }}>Users:</Typography>
// //           <FormGroup>
// //             {(selectedOrganization.users || []).map((user) => (
// //               <FormControlLabel
// //                 key={user.id}
// //                 control={
// //                   <Checkbox
// //                     checked={selectedUserIds.includes(user.id)}
// //                     onChange={() => handleUserSelection(user.id)}
// //                   />
// //                 }
// //                 label={user.username}
// //               />
// //             ))}
// //           </FormGroup>
// //           <div style={{ marginTop: '16px' }}>
// //             <ColorButton onClick={handleDeleteUsers} color="error">
// //               Delete Selected Users
// //             </ColorButton>
// //             <ColorButton onClick={() => setSelectedOrganization(null)} style={{ marginLeft: '8px' }}>
// //               Back to List
// //             </ColorButton>
// //           </div>
// //         </Paper>
// //       ) : (
// //         <Paper style={{ padding: '16px' }}>
// //           <Typography variant="h5" gutterBottom
// //           sx={{
// //            // Left-aligns the text
// //             border: '1px solid black', // Border around the text
// //             padding: '8px', // Padding inside the border
// //             fontStyle: 'italic', // Italic text style
// //             fontWeight: 'bold',
// //             color:"blue" ,
// //             fontSize: '30px',
// //             marginBottom:"10px"
// //             // Bold font style
// //           }}>
// //             List of Organizations
// //           </Typography>
// //           <Grid container spacing={3}>
// //             {organizations.map((org) => (
// //               <Grid item xs={12} sm={6} md={4} key={org.org_id}>
// //                 <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
// //                   <CardActionArea onClick={() => handleCardClick(org.org_id)}>
// //                     {org.image_url && (
// //                       <CardMedia
// //                         component="img"
// //                         sx={{ height: 120, objectFit: 'cover' }}
// //                         image={org.image_url}
// //                         alt={`${org.title} image`}
// //                       />
// //                     )}
// //                     <CardContent>
// //                       <Typography variant="h6">{org.title}</Typography>
// //                       <Typography variant="body2" color="text.secondary">
// //                         {org.description}
// //                       </Typography>
// //                     </CardContent>
// //                   </CardActionArea>
// //                 </Card>
// //               </Grid>
// //             ))}
// //           </Grid>
// //         </Paper>
// //       )}
// //       <SnackbarMessage
// //         open={snackbarOpen}
// //         message={snackbarMessage}
// //         onClose={handleSnackbarClose}
// //       />
// //     </div>
// //   );
// // };

// // export default OrganizationManager;


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
//   CardActionArea,
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { blueGrey } from '@mui/material/colors';
// import SnackbarMessage from './SnackbarComponent';

// const ColorButton = styled(Button)(({ theme }) => ({
//   color: theme.palette.getContrastText(blueGrey[500]),
//   backgroundColor: blueGrey[900],
//   '&:hover': {
//     backgroundColor: blueGrey[700],
//   },
// }));

// const OrganizationManager = () => {
//   const [organizations, setOrganizations] = useState([]);
//   const [orgId, setOrgId] = useState(null);
//   const [selectedOrganization, setSelectedOrganization] = useState(null);
//   const [selectedUserIds, setSelectedUserIds] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const fetchOrganizations = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch('http://localhost:4000/organization/organizations');
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

//   const fetchOrganizationDetails = async (orgId) => {
//     setIsLoading(true);
//     setErrorMessage('');
//     try {
//       const response = await fetch(
//         `http://localhost:4000/organization/organization-details/${orgId}`
//       );
//       if (response.ok) {
//         const data = await response.json();
//         setSelectedOrganization(data);
//         setOrgId(orgId);
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

//   useEffect(() => {
//     fetchOrganizations();
//   }, []);

//   const handleUserSelection = (userId) => {
//     setSelectedUserIds((prevSelectedUserIds) => {
//       if (prevSelectedUserIds.includes(userId)) {
//         return prevSelectedUserIds.filter((id) => id !== userId);
//       }
//       return [...prevSelectedUserIds, userId];
//     });
//   };

//   const handleDeleteUsers = async () => {
//     if (selectedUserIds.length === 0) {
//       setSnackbarMessage('No users selected for deletion.');
//       setSnackbarOpen(true);
//       return;
//     }

//     const errors = [];

//     for (const userId of selectedUserIds) {
//       try {
//         const response = await fetch(
//           `http://localhost:4000/organization/deleteUser/${orgId}/user/${userId}`,
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
//       setSnackbarMessage(errors.join(', '));
//       setSnackbarOpen(true);
//     } else {
//       await fetchOrganizationDetails(orgId);
//       setSelectedUserIds([]);
//       setSnackbarMessage('Selected users deleted successfully.');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleCardClick = (orgId) => {
//     fetchOrganizationDetails(orgId);
//   };

//   return (
//     <div>
//       {isLoading ? (
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//           <CircularProgress />
//         </div>
//       ) : errorMessage ? (
//         <Typography color="error" sx={{ marginTop: '16px' }}>
//           {errorMessage}
//         </Typography>
//       ) : selectedOrganization ? (
//         <Paper style={{ padding: '16px' }}>
//           <Typography variant="h5"
//            sx={{
//             border: '1px solid black',
//             padding: '8px',
//             fontStyle: 'italic',
//             fontWeight: 'bold',
//             fontSize:"40px",
//           }}>
//             {selectedOrganization.organization_name}
//           </Typography>
//           <Typography variant="h6"
//            sx={{
//             fontWeight: 'bold',
//             fontSize:"15px",
//           }}>
//             Number of Users: {selectedOrganization.number_of_users}
//           </Typography>

//           {selectedOrganization.number_of_users === 0 ? (
//             <>
//               <Typography variant="body1" color="text.secondary">
//                 No users found in this organization.
//               </Typography>
//               <ColorButton onClick={() => setSelectedOrganization(null)} style={{ marginTop: '16px' }}>
//                 Back to List
//               </ColorButton>
//             </>
//           ) : (
//             <>
//               <Typography variant="h6"
//                sx={{
//                 fontWeight: 'bold',
//                 fontSize:"20px",
//               }}>
//                 Users:
//               </Typography>
//               <FormGroup>
//                 {(selectedOrganization.users || []).map((user) => (
//                   <FormControlLabel
//                     key={user.id}
//                     control={
//                       <Checkbox
//                         checked={selectedUserIds.includes(user.id)}
//                         onChange={() => handleUserSelection(user.id)}
//                       />
//                     }
//                     label={user.username}
//                   />
//                 ))}
//               </FormGroup>
//               <div style={{ marginTop: '16px' }}>
//                 <ColorButton onClick={handleDeleteUsers} color="error">
//                   Delete Selected Users
//                 </ColorButton>
//                 <ColorButton onClick={() => setSelectedOrganization(null)} style={{ marginLeft: '8px' }}>
//                   Back to List
//                 </ColorButton>
//               </div>
//             </>
//           )}
//         </Paper>
//       ) : (
//         <Paper style={{ padding: '16px' }}>
//           <Typography variant="h5"
//           sx={{
//            border: '1px solid black',
//            padding: '8px',
//            fontStyle: 'italic',
//            fontWeight: 'bold',
//            fontSize: '30px',
//            color: 'blue',
//            marginBottom: '10px'
//           }}>
//             List of Organizations
//           </Typography>
//           <Grid container spacing={3}>
//             {(organizations || []).map((org) => (
//               <Grid item xs={12} sm={6} md={4} key={org.org_id}>
//                 <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
//                   <CardActionArea onClick={() => handleCardClick(org.org_id)}>
//                     {org.image_url && (
//                       <CardMedia
//                         component="img"
//                         sx={{ height: 120, objectFit: 'cover' }}
//                         image={org.image_url}
//                         alt={`${org.title} image`}
//                       />
//                     )}
//                     <CardContent>
//                       <Typography variant="h6">{org.title}</Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {org.description}
//                       </Typography>
//                     </CardContent>
//                   </CardActionArea>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Paper>
//       )}
//       <SnackbarMessage
//         open={snackbarOpen}
//         message={snackbarMessage}
//         onClose={handleSnackbarClose}
//       />
//     </div>
//   );
// };

// export default OrganizationManager;


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
  CardActionArea,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';
import SnackbarMessage from './SnackbarComponent';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blueGrey[500]),
  backgroundColor: blueGrey[900],
  '&:hover': {
    backgroundColor: blueGrey[700],
  },
}));

const OrganizationManager = () => {
  const [organizations, setOrganizations] = useState([]);
  const [orgId, setOrgId] = useState(null);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  const fetchOrganizations = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:4001/organization/organizations');
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

  const fetchOrganizationDetails = async (orgId) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch(
        `http://localhost:4001/organization/organization-details/${orgId}`
      );
      if (response.ok) {
        const data = await response.json();
        setSelectedOrganization(data);
        setOrgId(orgId);
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

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleUserSelection = (userId) => {
    setSelectedUserIds((prevSelectedUserIds) => {
      if (prevSelectedUserIds.includes(userId)) {
        return prevSelectedUserIds.filter((id) => id !== userId);
      }
      return [...prevSelectedUserIds, userId];
    });
  };

  const handleDeleteUsers = async () => {
    if (selectedUserIds.length === 0) {
      setSnackbarMessage('No users selected for deletion.');
      setSnackbarOpen(true);
      return;
    }
    
    const errors = [];

    for (const userId of selectedUserIds) {
      try {
        const response = await fetch(
          `http://localhost:4001/organization/deleteUser/${orgId}/user/${userId}`,
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
      setSelectedUserIds([]);
      setSnackbarMessage('Selected users deleted successfully.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCardClick = (orgId) => {
    fetchOrganizationDetails(orgId);
  };

  return (
    <div>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', align_items: 'center', height: '100vh' }}>
          <CircularProgress />
        </div>
      ) : errorMessage ? (
        // Error handling with "Back to List" button
        <div style={{ text_align: 'center', margin_top: '16px' }}>
          <Typography color="error">{errorMessage}</Typography>
          <ColorButton
            onClick={() => {
              setSelectedOrganization(null); // Reset to go back to list
              setErrorMessage(''); // Clear error message
            }}
            style={{ margin_top: '16px' }}
          >
            Back to List
          </ColorButton>
        </div>
      ) : selectedOrganization ? (
        <Paper style={{ padding: '16px' }}>
          <Typography variant="h5">{selectedOrganization.organization_name}</Typography>
          <Typography variant="h6">Number of Users: {selectedOrganization.number_of_users}</Typography>

          {selectedOrganization.number_of_users === 0 ? (
            <>
              <Typography variant="body1" color="text.secondary">No users found in this organization.</Typography>
              <ColorButton
                onClick={() => setSelectedOrganization(null)}
                style={{ marginTop: '16px' }}
              >
                Back to List
              </ColorButton>
            </>
          ) : (
            <>
              <Typography variant="h6">Users:</Typography>
              <FormGroup>
                {(selectedOrganization.users || []).map((user) => (
                  <FormControlLabel
                    key={user.id}
                    control={
                      <Checkbox
                        checked={selectedUserIds.includes(user.id)}
                        onChange={() => handleUserSelection(user.id)}
                      />
                    }
                    label={user.username}
                  />
                ))}
              </FormGroup>
              <div style={{ marginTop: '16px' }}>
                <ColorButton onClick={handleDeleteUsers} color="error">
                  Delete Selected Users
                </ColorButton>
                <ColorButton
                  onClick={() => setSelectedOrganization(null)}
                  style={{ marginLeft: '8px' }}
                >
                  Back to List
                </ColorButton>
              </div>
            </>
          )}
        </Paper>
      ) : (
        <Paper style={{ padding: '16px' }}>
          <Typography variant="h5" sx={{
           border: '1px solid black',
           padding: '8px',
        
           fontWeight: 'bold',
           fontSize: '30px',
           color: 'blue',
           marginBottom: '10px'
          }}>List of Organizations</Typography>
          <Grid container spacing={3}>
            {(organizations || []).map((org) => (
              <Grid item xs={12} sm={6} md={4} key={org.org_id}>
                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <CardActionArea onClick={() => handleCardClick(org.org_id)}>
                    {org.image_url && (
                      <CardMedia
                        component="img"
                        sx={{ height: 120, objectFit: 'cover' }}
                        image={org.image_url}
                        alt={`${org.title} image`}
                      />
                    )}
                    <CardContent>
                      <Typography variant="h6">{org.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {org.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
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

