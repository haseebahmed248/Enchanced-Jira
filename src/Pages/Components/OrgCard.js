// // import CardContent from '@mui/material/CardContent';
// // import CardMedia from '@mui/material/CardMedia';
// // import Typography from '@mui/material/Typography';
// // import { Button, CardActionArea, CardActions } from '@mui/material';
// // import { styled } from '@mui/material/styles';
// // import Card from '@mui/material/Card';
// // import { blueGrey } from '@mui/material/colors';
// // import { useNavigate } from 'react-router-dom';

// // const ColorButton = styled(Button)(({ theme }) => ({
// //   color: theme.palette.getContrastText(blueGrey[500]),
// //   backgroundColor: blueGrey[900],
// //   '&:hover': {
// //     backgroundColor: blueGrey[700],
// //   },
// // }));

// // function OrgCard({ organizations }) {
// //   const Navigate = useNavigate();

// //   function orgSubmit(orgId){
// //     console.log(orgId);
// //     Navigate('/organizations/Home')
// //   }

// //   return (
// //     <div style={{ display: 'flex', flexWrap: 'wrap', borderRadius: '8px' }}>
// //       {organizations.length > 0? (
// //         organizations.map((organization) => (
// //           <Card sx={{ width: '47%', margin: '10px' }} key={organization.org_id}>
// //             <CardActionArea>
// //               <CardMedia
// //                 component="img"
// //                 height="140"
// //                 image={organization.image_url}
// //                 alt={organization.title}
// //               />
// //               <CardContent>
// //                 <Typography gutterBottom variant="h5" component="div" >
// //                   {organization.title}
// //                 </Typography>
// //                 <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'start' }}>
// //                   {organization.description}
// //                 </Typography>
// //               </CardContent>
// //             </CardActionArea>
// //             <CardActions>
// //               <div style={{ marginRight: 'auto' }}>
// //                 <ColorButton variant="contained" onClick={() => orgSubmit(organization.org_id)}>
// //                   Select
// //                 </ColorButton>
// //               </div>
// //             </CardActions>
// //           </Card>
// //         ))
// //       ) : (
// //         <h3>Join new Groups</h3>
// //       )}
// //     </div>
// //   );
// // }

// // export default OrgCard;

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import { blueGrey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blueGrey[500]),
  backgroundColor: blueGrey[900],
  '&:hover': {
    backgroundColor: blueGrey[700],
  },
}));

function OrgCard({ organizations }) {
  const navigate = useNavigate(); // Use lowercase for function names

  function orgSubmit(orgId) {
    console.log(orgId);
    navigate('/organizations/Home'); // Corrected case
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {organizations.length > 0 ? (
        organizations.map((organization) => (
          <Card sx={{ width: '45%', margin: '10px' }} key={organization.org_id}>
            <CardActionArea onClick={() => orgSubmit(organization.org_id)}>
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
