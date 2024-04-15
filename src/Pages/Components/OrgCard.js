import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Card from '@mui/material/Card'

function OrgCard({ organizations }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', border: '1px solid rgba(0,0,0,0.2)', width: '60%', borderRadius: '8px', padding: '20px', position:'absolute', top:'10%' }}>
      {organizations.length > 0 ? (
        organizations.map((organization) => (
          <Card sx={{ width: '47%', margin: '10px' }} key={organization.id}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={organization.image_url}
              alt={organization.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {organization.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {organization.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
        ))
      ) : (
        <h3>Join new Groups</h3> 
      )}
    </div>
  );
}

export default OrgCard;
