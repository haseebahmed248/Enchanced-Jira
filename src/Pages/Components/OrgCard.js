import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { AccountContext } from './Security/AccountContext';

function OrgCard({ organizations }) {
  const {currentUser,setSelectedOrgId} = useContext(AccountContext);
  const [userOrganizations, setUserOrganizations] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    // Fetch organizations of the current user
    const fetchUserOrganizations = async () => {
      try {
        const response = await fetch(`http://localhost:4003/users/getOrganizationsOfUserByEmail/${currentUser.email}`);
        if (response.ok) {
          const data = await response.json();
          setUserOrganizations(data);
          console.log(organizations)
        } else {
          console.error('Error fetching user organizations:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user organizations:', error);
      }
    };

    if (currentUser.email) {
      fetchUserOrganizations();
    }
  }, [currentUser.email]);

  function orgSubmit(orgId) {
    setSelectedOrgId(orgId);
    console.log(orgId);
    Navigate('/organizations/Home');
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      justifyContent: 'center', 
      alignItems: 'center', 
      borderRadius: '8px', 
      width:'80%', 
      margin: '0 auto', 
    }}>
      {userOrganizations.length > 0 ? (
        userOrganizations.map((organization) => (
          <Card 
              sx={{ 
                width: '100%', 
                margin: '10px', 
                borderRadius: '8px',
                position: 'relative', 
                overflow: 'hidden', 
                '&:hover::after': {
                  transform: 'scaleX(1)'
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: '88%',
                  background: '#3D52A0',
                  transform: 'scaleX(0)',
                  transformOrigin: 'right',
                  transition: 'transform 0.3s ease-in-out',
                  borderRadius: '8px'
                }
              }} 
              key={organization.org_id}
            >
            <CardActionArea onClick={()=> orgSubmit(organization.org_id)} >
              <Grid container>
                <Grid item xs={3}>
                  <CardMedia
                    component="img"
                    sx={{
                      height: 120,
                      objectFit: 'cover',
                    }}
                    image={organization.image_url}
                    alt={organization.title}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{fontWeight:'bold', color:' #3D52A0'}}>
                      {organization.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'start' }}>
                      {organization.description ? organization.description.substring(0, 2) : 'No description available'}
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </CardActionArea>
          </Card>
        ))
      ) : (
        <Typography variant="h5">Join new Groups</Typography>
      )}
    </div>
  );
}

export default OrgCard;
