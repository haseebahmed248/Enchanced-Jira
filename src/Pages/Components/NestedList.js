import React, { useContext, useState, useEffect } from 'react';
import NestedListItem from './NestedListItem';
import List from '@mui/material/List';
import { ListSubheader } from '@mui/material';
import axios from 'axios';
import { AccountContext } from './Security/AccountContext';

export default function NestedList() {
  const {currentUser} = useContext(AccountContext); 
  const [unassociatedOrganizations, setUnassociatedOrganizations] = useState([]);

  useEffect(() => {
    const fetchUnassociatedOrganizations = async () => {
      try {
        const response = await axios.get(`http://localhost:4003/users/getUnassociatedOrganizationsByEmail/${currentUser.email}`);
        setUnassociatedOrganizations(response.data);
      } catch (error) {
        console.error('Error fetching unassociated organizations:', error);
      }
    };

    fetchUnassociatedOrganizations();
  }, [currentUser]);
  const handleAddUserToOrganization = async (org_id) => {
    try {
      await axios.post(`http://localhost:4003/users/addUserInOrganizationByEmail/${org_id}`, { email: currentUser.email });
      alert('User added to organization successfully');
    } catch (error) {
      console.error('Error adding user to organization:', error);
      alert('Error adding user to organization');
    }
  };
  
  return (
    <List
      sx={{width:'100%', maxWidth: 300, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Organizations Invitations
        </ListSubheader>
      }
    >
      {unassociatedOrganizations.map((organization) => (
        <NestedListItem
          key={organization.org_id}
          primary={organization.title}
          image={organization.image_url}
          onClick={() => handleAddUserToOrganization(organization.org_id)}
        />
      ))}
    </List>
  );
}
