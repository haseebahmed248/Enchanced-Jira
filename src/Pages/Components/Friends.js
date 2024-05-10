import React from 'react';
import { Badge, Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import '../CSS/Friends.css';
import PropTypes from 'prop-types';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%',
    display: 'flex',
    height: '60px',
    alignItems: 'center',
    '@media (max-width:600px)': {
        flexDirection: 'column',
        height: 'auto',
    },
}));

Friends.propTypes = {
    image: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default function Friends({ image, alt, username,connected ,onClick, }) {
    return (
        <Card sx={{ 
            marginBottom: '10px', 
            cursor: 'pointer', 
            borderRadius: '20px', 
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', 
            transition: '0.3s',
            '&:hover': {
                boxShadow: '0 8px 16px 0 rgba(0,0,0,0.6)',
            },
        }} onClick={onClick}>
        
            <Item>
            <Badge variant="dot" invisible={connected == 'true'?false:true} color='success'>
                <CardMedia
                    component="img"
                    sx={{ width: 30, height: 30, borderRadius: '50%', margin: '10px', marginTop: '4px'}}
                    image={image}
                    alt={alt} />
                    </Badge>
                    
                <h3 className="username" style={{ margin: '0', color: '#333', fontSize: '16px' }}>{username}</h3>
            </Item>
        </Card>
    );
}