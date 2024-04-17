import * as React from 'react';
import NestedListItem from './NestedListItem';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import List from '@mui/material/List';
import { ListSubheader } from '@mui/material';

export default function NestedList() {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Organizations Invitations
        </ListSubheader>
      }
    >
      <NestedListItem primary="Data" image="" alt={"hello"} />
      <NestedListItem primary="Drafts" icon={<DraftsIcon />}  />
      <NestedListItem primary="Sent" icon={<SendIcon />}  />
    </List>
  );
}