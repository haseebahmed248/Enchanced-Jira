import React, { useEffect, useState } from 'react';
import {
  Paper,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Button,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const OrgContainer = styled(Paper)({
  padding: '16px',
  textAlign: 'center',
  margin: '8px 0',
});

const OrganizationManager = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [organizations, setOrganizations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const onDrop = (acceptedFiles) => {
    setImageFile(acceptedFiles[0]);
    setStatusMessage('');
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  const uploadImage = async () => {
    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);

      try {
        const response = await axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          setStatusMessage('Image uploaded successfully.');
          return response.data.url; // Return the uploaded image URL
        } else {
          setStatusMessage('Image upload failed.');
          return null;
        }
      } catch (error) {
        setStatusMessage('Error uploading the image.');
        return null;
      }
    }
    return null;
  };

  const handleSubmit = async () => {
    const imageUrl = await uploadImage();

    if (imageFile && !imageUrl) {
      setStatusMessage('Failed to upload image. Please try again.');
      return;
    }

    try {
      const response = await axios.post('/users/organizations', {
        title,
        description,
        image_url: imageUrl,
      });

      if (response.status === 200) {
        setStatusMessage('Organization added successfully!');
        setTitle('');
        setDescription('');
        setImageFile(null);
        fetchOrganizations(); // Refresh the list of organizations
      } else {
        const errorText = response.data?.message || 'Failed to add organization';
        setStatusMessage(`Error: ${errorText}`);
      }
    } catch (error) {
      setStatusMessage('An error occurred while adding the organization.');
    }
  };

  const fetchOrganizations = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/users/organizations');
      if (response.status === 200) {
        setOrganizations(response.data);
        setStatusMessage('');
      } else {
        const errorText = response.data?.message || 'Error fetching organizations';
        setStatusMessage(`Error: ${errorText}`);
      }
    } catch (error) {
      setErrorMessage('Error fetching organizations.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <OrgContainer>
      <Typography variant="h6">Add Organization</Typography>
      <TextField
        label="Organization Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ marginBottom: '8px' }}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ marginBottom: '8px' }}
      />

      <div
        {...getRootProps()}
        style={{ border: '1px dashed gray', padding: '16px', margin: '8px 0' }}
      >
        <input {...getInputProps()} />
        {imageFile ? (
          <>
            <CardMedia
              component="img"
              height="140"
              image={URL.createObjectURL(imageFile)}
              alt="Selected image"
            />
            <Typography variant="body1">Change Image</Typography>
          </>
        ) : (
          <Typography>Drag and drop an image here, or click to select an image to upload</Typography>
        )}
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ marginTop: '16px' }}
      >
        Submit
      </Button>

      {statusMessage && (
        <Typography variant="body1" sx={{ marginTop: '16px' }}>
          {statusMessage}
        </Typography>
      )}

      {isLoading ? (
        <CircularProgress />
      ) : errorMessage ? (
        <Typography color="error" sx={{ marginTop: '16px' }}>
          {errorMessage}
        </Typography>
      ) : (
        <Paper style={{ padding: '16px' }}>
          <Typography variant="h6">List of Organizations</Typography>
          {organizations.map((org) => (
            <Card key={org.org_id} style={{ margin: '16px 0' }}>
              {org.image_url && (
                <CardMedia
                  component="img"
                  height="140"
                  image={org.image_url}
                  alt={`${org.title} image`}
                />
              )}
              <CardContent>
                <Typography variant="h6">{org.title}</Typography>
                <Typography variant="body1">{org.description}</Typography>
              </CardContent>
            </Card>
          ))}
        </Paper>
      )}
    </OrgContainer>
  );
};

export default OrganizationManager;
