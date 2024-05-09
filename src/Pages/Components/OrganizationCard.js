import React, { useState } from "react";
import { Paper, Typography, Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";


const OrgContainer = styled(Paper)(({ theme }) => ({
  padding: "24px", 
  textAlign: "center",
  margin: "16px 0", 
  borderRadius: "12px", 
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", 
}));


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
      const response = await fetch("http://localhost:4001/organization/organizations", {
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
