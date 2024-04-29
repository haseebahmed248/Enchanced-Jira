import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import { Typography } from '@mui/material';

const SlideTransition = (props) => {
  return <Slide {...props} direction="up" />;
};

const SnackbarMessage = ({ open, message, onClose }) => {
  const formattedMessage = message.length > 30 ? message.slice(0, 27) + '...' : message;

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      TransitionComponent={SlideTransition}
      autoHideDuration={2000} // Duration for auto-hide
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Snackbar at the bottom-center
      sx={{
        '& .MuiSnackbarContent-root': {
          backgroundColor: 'white', // White background
          color: 'black', // Black text color for contrast
          borderRadius: 10, // Rounded corners
          padding: '6px 12px', // Padding inside the snackbar
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)', // Shadow effect
          minHeight: '40px', // Minimum height
          maxHeight: '40px', // Maximum height
          overflow: 'hidden', // Overflow handling
          display: 'flex', // Flexbox for proper alignment
          justifyContent: 'center', // Centering text horizontally
          alignItems: 'center', // Centering text vertically
        },
      }}
      message={
        <Typography variant="body2" noWrap> {/* No-wrap to prevent line breaks */}
          {formattedMessage}
        </Typography>
      }
    />
  );
};

export default SnackbarMessage;
