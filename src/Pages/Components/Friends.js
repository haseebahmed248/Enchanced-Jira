import React from 'react';
import { Card } from '@mui/material';
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
    height: '20px',
    alignItems: 'center',
}));

Friends.propTypes = {
    image: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };
  

export default function Friends({ image, alt, username,onClick }) {
    return (
        <Card sx={{ marginBottom: '10px', cursor: 'pointer' }} onClick={onClick}>
            <Item>
                <CardMedia
                    component="img"
                    sx={{ width: 30, height: 30 }}
                    image="https://plus.unsplash.com/premium_photo-1676637000058-96549206fe71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                    alt={alt} />
                <h3 className="username">{username}</h3>
            </Item>
        </Card>
    );
}