import React, { useContext, useEffect, useState } from 'react';
import UserContext from './UserContext';

import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blueGrey[500]),
  backgroundColor: blueGrey[900],
  '&:hover': {
    backgroundColor: blueGrey[700],
  },
}));

function OrgCard({ organizations }) {
  const userId = useContext(UserContext);
  const [userOrganizations, setUserOrganizations] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    // Fetch organizations of the current user
    const fetchUserOrganizations = async () => {
      try {
        const response = await fetch(`http://localhost:4000/users/getOrganizationsOfUserByEmail/${userId.email}`);
        if (response.ok) {
          const data = await response.json();
          setUserOrganizations(data);
        } else {
          console.error('Error fetching user organizations:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user organizations:', error);
      }
    };

    if (userId.email) {
      fetchUserOrganizations();
    }
  }, [userId.email]);

  function orgSubmit(orgId) {
    console.log(orgId);
    Navigate('/organizations/Home');
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', borderRadius: '8px' }}>
      {userOrganizations.length > 0 ? (
        userOrganizations.map((organization) => (
          <Card sx={{ width: '47%', margin: '10px' }} key={organization.org_id}>
            <CardActionArea>
              <CardMedia
                component="img"
                sx={{
                  height: 120, // Reduced height to ensure more space for content
                  objectFit: 'cover',
                }}
                image={organization.image_url}
                
                alt={organization.title}
              />
            
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {organization.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'start' }}>
                  {organization.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <div style={{ marginRight: 'auto' }}>
                <ColorButton
                  variant="contained"
                  onClick={() => orgSubmit(organization.org_id)}
                >
                  Select
                </ColorButton>
              </div>
            </CardActions>
          </Card>
        ))
      ) : (
        <Typography variant="h5">Join new Groups</Typography>
      )}
    </div>
  );
}

export default OrgCard;
