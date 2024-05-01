

// // import React, { useEffect, useState } from "react";
// // import {
// //   Paper,
// //   Card,
// //   CardContent,
// //   CardMedia,
// //   Typography,
// //   CircularProgress,
// //   Button,
// //   TextField,
// // } from "@mui/material";
// // import { styled } from "@mui/material/styles";

// // const OrgContainer = styled(Paper)({
// //   padding: "16px",
// //   textAlign: "center",
// //   margin: "8px 0",
// // });

// // const OrganizationManager = () => {
// //   const [title, setTitle] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [imageUrl, setImageUrl] = useState("");
// //   const [statusMessage, setStatusMessage] = useState("");
// //   const [organizations, setOrganizations] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [errorMessage, setErrorMessage] = useState("");

// //   const handleSubmit = async () => {
// //     try {
// //       const response = await fetch("/organization/organizations", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           title,
// //           description,
// //           image_url: imageUrl,
// //         }),
// //       });

// //       if (response.ok) {
// //         setStatusMessage("Organization added successfully!");
// //         setTitle("");
// //         setDescription("");
// //         setImageUrl("");
// //         // Refresh the list of organizations after adding a new one
// //         fetchOrganizations();
// //       } else {
// //         const errorMessage = await response.text();
// //         setStatusMessage(`Error: ${errorMessage}`);
// //       }
// //     } catch (error) {
// //       setStatusMessage("An error occurred while adding the organization.");
// //     }
// //   };

// //   const fetchOrganizations = async () => {
// //     try {
// //       const response = await fetch("/organization/organizations");
// //       if (response.ok) {
// //         const data = await response.json();
// //         setOrganizations(data);
// //       } else {
// //         const errorText = await response.text();
// //         setErrorMessage(`Error: ${errorText}`);
// //       }
// //     } catch (error) {
// //       setErrorMessage("Error fetching organizations.");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchOrganizations();
// //   }, []); // Empty array ensures this effect runs once when component mounts

// //   return (
// //     <OrgContainer>
// //       <Typography variant="h6">Add Organization</Typography>
// //       <TextField
// //         label="Organization Title"
// //         variant="outlined"
// //         fullWidth
// //         value={title}
// //         onChange={(e) => setTitle(e.target.value)}
// //         sx={{ marginBottom: "8px" }}
// //       />
// //       <TextField
// //         label="Description"
// //         variant="outlined"
// //         fullWidth
// //         multiline
// //         rows={4}
// //         value={description}
// //         onChange={(e) => setDescription(e.target.value)}
// //         sx={{ marginBottom: "8px" }}
// //       />
// //       <TextField
// //         label="Image URL"
// //         variant="outlined"
// //         fullWidth
// //         value={imageUrl}
// //         onChange={(e) => setImageUrl(e.target.value)}
// //         sx={{ marginBottom: "8px" }}
// //       />
// //       <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginTop: "16px" }}>
// //         Submit
// //       </Button>
// //       {statusMessage && (
// //         <Typography variant="body1" sx={{ marginTop: "16px" }}>
// //           {statusMessage}
// //         </Typography>
// //       )}
// //       {isLoading ? (
// //         <CircularProgress />
// //       ) : errorMessage ? (
// //         <Typography color="error" sx={{ marginTop: "16px" }}>
// //           {errorMessage}
// //         </Typography>
// //       ) : (
// //         <Paper style={{ padding: "16px" }}>
// //           <Typography variant="h6">List of Organizations</Typography>
// //           {organizations.map((org) => (
// //             <Card key={org.org_id} style={{ margin: "16px 0" }}>
// //               {org.image_url && (
// //                 <CardMedia
// //                   component="img"
// //                   height="140"
// //                   image={org.image_url}
// //                   alt={`${org.title} image`}
// //                 />
// //               )}
// //               <CardContent>
// //                 <Typography variant="h6">{org.title}</Typography>
// //                 <Typography variant="body1">{org.description}</Typography>
// //               </CardContent>
// //             </Card>
// //           ))}
// //         </Paper>
// //       )}
// //     </OrgContainer>
// //   );
// // };

// // export default OrganizationManager;

// // import React, { useState } from "react";
// // import {
// //   Paper,
// //   Typography,
// //   Button,
// //   TextField,
// // } from "@mui/material";
// // import { styled } from "@mui/material/styles";

// // const OrgContainer = styled(Paper)({
// //   padding: "16px",
// //   textAlign: "center",
// //   margin: "8px 0",
// // });

// // const OrganizationCard = ({ onAddOrganization }) => {
// //   const [title, setTitle] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [imageUrl, setImageUrl] = useState("");
// //   const [statusMessage, setStatusMessage] = useState("");

// //   const handleSubmit = async () => {
// //     try {
// //       const response = await fetch("/organization/organizations", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           title,
// //           description,
// //           image_url: imageUrl,
// //         }),
// //       });

// //       if (response.ok) {
// //         setStatusMessage("Organization added successfully!");
// //         setTitle("");
// //         setDescription("");
// //         setImageUrl("");
// //         onAddOrganization(); // Notify parent component to refresh data
// //       } else {
// //         const errorMessage = await response.text();
// //         setStatusMessage(`Error: ${errorMessage}`);
// //       }
// //     } catch (error) {
// //       setStatusMessage("An error occurred while adding the organization.");
// //     }
// //   };

// //   return (
// //     <OrgContainer>
// //       <Typography variant="h6">Add Organization</Typography>
// //       <TextField
// //         label="Organization Title"
// //         variant="outlined"
// //         fullWidth
// //         value={title}
// //         onChange={(e) => setTitle(e.target.value)}
// //         sx={{ marginBottom: "8px" }}
// //       />
// //       <TextField
// //         label="Description"
// //         variant="outlined"
// //         fullWidth
// //         multiline
// //         rows={4}
// //         value={description}
// //         onChange={(e) => setDescription(e.target.value)}
// //         sx={{ marginBottom: "8px" }}
// //       />
// //       <TextField
// //         label="Image URL"
// //         variant="outlined"
// //         fullWidth
// //         value={imageUrl}
// //         onChange={(e) => setImageUrl(e.target.value)}
// //         sx={{ marginBottom: "8px" }}
// //       />
// //       <Button
// //         variant="contained"
// //         color="primary"
// //         onClick={handleSubmit}
// //         sx={{ marginTop: "16px" }}
// //       >
// //         Submit
// //       </Button>
// //       {statusMessage && (
// //         <Typography variant="body1" sx={{ marginTop: "16px" }}>
// //           {statusMessage}
// //         </Typography>
// //       )}
// //     </OrgContainer>
// //   );
// // };

// // export default OrganizationCard;
// import React, { useState } from "react";
// import {
//   Paper,
//   Typography,
//   Button,
//   TextField,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";

// // Styled components with additional styles for rounded corners, shadow, and padding
// const OrgContainer = styled(Paper)(({ theme }) => ({
//   padding: "24px", // Increased padding for a more spacious feel
//   textAlign: "center",
//   margin: "16px 0", // Increased margin for better separation from other elements
//   borderRadius: "12px", // Rounded corners
//   boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow for 3D effect
// }));

// // Custom styles for the text fields to add spacing and maintain consistency
// const StyledTextField = styled(TextField)(({ theme }) => ({
//   marginBottom: "16px", // Increased space between fields
//   "& .MuiOutlinedInput-root": {
//     borderRadius: "8px", // Rounded corners for input fields
//   },
// }));

// const OrganizationCard = ({ onAddOrganization }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [statusMessage, setStatusMessage] = useState("");

//   const handleSubmit = async () => {
//     try {
//       const response = await fetch("/organization/organizations", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title,
//           description,
//           image_url: imageUrl,
//         }),
//       });

//       if (response.ok) {
//         setStatusMessage("Organization added successfully!");
//         setTitle("");
//         setDescription("");
//         setImageUrl("");
//         onAddOrganization(); // Notify parent component to refresh data
//       } else {
//         const errorMessage = await response.text();
//         setStatusMessage(`Error: ${errorMessage}`);
//       }
//     } catch (error) {
//       setStatusMessage("An error occurred while adding the organization.");
//     }
//   };

//   return (
//     <OrgContainer>
//       <Typography variant="h5" component="h2" color="primary">
//         Add Organization
//       </Typography>
//       <StyledTextField
//         label="Organization Title"
//         variant="outlined"
//         fullWidth
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <StyledTextField
//         label="Description"
//         variant="outlined"
//         fullWidth
//         multiline
//         rows={4}
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <StyledTextField
//         label="Image URL"
//         variant="outlined"
//         fullWidth
//         value={imageUrl}
//         onChange={(e) => setImageUrl(e.target.value)}
//       />
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleSubmit}
//         sx={{ marginTop: "16px", padding: "12px 24px" }} // Added padding for better button appearance
//       >
//         Submit
//       </Button>
//       {statusMessage && (
//         <Typography
//           variant="body1"
//           sx={{
//             marginTop: "16px",
//             color: statusMessage.startsWith("Error") ? "red" : "green", // Conditional coloring for status message
//           }}
//         >
//           {statusMessage}
//         </Typography>
//       )}
//     </OrgContainer>
//   );
// };

// export default OrganizationCard;
import React, { useState } from "react";
import { Paper, Typography, Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled components with additional styles for rounded corners, shadow, and padding
const OrgContainer = styled(Paper)(({ theme }) => ({
  padding: "24px", // Increased padding for a more spacious feel
  textAlign: "center",
  margin: "16px 0", // Increased margin for better separation from other elements
  borderRadius: "12px", // Rounded corners
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow for 3D effect
}));

// Custom styles for the text fields to add spacing and maintain consistency
const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: "16px", // Increased space between fields
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px", // Rounded corners for input fields
  },
}));

// Styled button with additional padding and hover effect
const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: "16px",
  padding: "12px 24px",
  borderRadius: "8px",
  backgroundColor: 'black', // Set the background color to black
  color: 'white', // Set the text color to white
  '&:hover': {
    backgroundColor: '#333', // Slightly lighter shade for hover effect
  }, // Rounded corners
  transition: "background-color 0.3s", // Smooth transition for hover effect
   // Darker shade on hover
  
}));

const OrganizationCard = ({ onAddOrganization }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("/organization/organizations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          image_url: imageUrl,
        }),
      });

      if (response.ok) {
        setStatusMessage("Organization added successfully!");
        setTitle("");
        setDescription("");
        setImageUrl("");
        onAddOrganization(); // Notify parent component to refresh data
      } else {
        const errorMessage = await response.text();
        setStatusMessage(`Error: ${errorMessage}`);
      }
    } catch (error) {
      setStatusMessage("An error occurred while adding the organization.");
    }
  };

  return (
    <OrgContainer>
      <Typography variant="h5" component="h2" sx={{
           // Left-aligns the text
             // Border around the text
            padding: '8px', // Padding inside the border
            // Italic text style
            fontWeight: 'bold',
            color:"blue" ,
            fontSize: '30px',
            marginBottom:"10px"
            
            // Bold font style
          }}>
        Add Organization
      </Typography>
      <StyledTextField
        label="Organization Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <StyledTextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <StyledTextField
        label="Image URL"
        variant="outlined"
        fullWidth
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <StyledButton
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Submit
      </StyledButton>
      {statusMessage && (
        <Typography
          variant="body1"
          sx={{
            marginTop: "16px",
            color: statusMessage.startsWith("Error") ? "red" : "green", // Conditional coloring for status message
          }}
        >
          {statusMessage}
        </Typography>
      )}
    </OrgContainer>
  );
};

export default OrganizationCard;
