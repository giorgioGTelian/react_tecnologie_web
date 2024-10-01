import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Grid, Container } from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const About = () => {
    const [updateStatus, setUpdateStatus] = useState('');
    const [labels, setLabels] = useState({
        name: '',
        birthdate: '',
        city: '',
        state: '',
        country: '',
        occupation: '',
        phoneNumber: ''
    });

    useEffect(() => {
        const fetchLabels = async () => {
            try {
                // Retrieve the JWT from local storage
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
    
                // Fetch the user data from the backend using the token
                const response = await axios.get(`http://localhost:9000/get-user`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                if (response.status === 200) {
                    const userData = response.data.user; // Accessing user from the response
                    
                    setLabels({
                        name: userData.name,
                        birthdate: userData.birthdate|| 'Data di nascita da inserire',
                        city: userData.city || 'Città da inserire',
                        state: userData.state || 'Stato da inserire',
                        country: userData.country || 'Nazionalità da inserire',
                        occupation: userData.occupation || 'Impiego da inserire',
                        phoneNumber: userData.phoneNumber || 'Numero di telefono da inserire'
                    });
                } else {
                    console.error('Error fetching user data');
                }
            } catch (error) {
                console.error('Unexpected error:', error);
            }
        };
    
        fetchLabels();
    }, []);
    


const handleProfileUpdate = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const updatedData = {
            birthdate: data.get('birthdate'),
            city: data.get('city'),
            state: data.get('state'),
            country: data.get('country'),
            occupation: data.get('occupation'),
            phoneNumber: data.get('phoneNumber'),
            notes: data.get('notes'),
    };

    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found');
        setUpdateStatus('No token found');
        return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken._id; 

    try {
        const response = await axios.put(`http://localhost:9000/update-profile/${userId}`, updatedData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (response.status === 200) {
            console.log('Profile updated successfully');
            setUpdateStatus('Profile updated successfully');
        } else {
            console.error('Error updating profile');
            setUpdateStatus('Error updating profile');
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        setUpdateStatus('Unexpected error occurred');
    }
};
    
    return (
        <>
        <Container component="main" maxWidth="s">
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
        <Typography component="h1" variant="h5">Aggiorna Profilo di {labels.name}</Typography>
                <Box component="form" noValidate onSubmit={handleProfileUpdate} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                        <Typography>Data di nascita</Typography>
                            <TextField fullWidth autoFocus name="birthdate" label={labels.birthdate} type="date" InputLabelProps={{ shrink: true }} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography>Città</Typography>
                            <TextField name="city" label={labels.city} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <Typography>Stato</Typography>
                            <TextField name="state" label={labels.state} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography>Nazionalità</Typography>
                            <TextField name="country" label={labels.country} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography>Impiego</Typography>
                            <TextField name="occupation" label={labels.occupation} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography>Numero di telefono</Typography>
                            <TextField name="phoneNumber" label={labels.phoneNumber} />
                        </Grid>
                        <Box sx={{ justifyContent: 'center' }}>
                            <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>Aggiorna Profilo</Button>
                        </Box>
                    </Grid>
                </Box>
        </Box>
        </Container>
        </>
    )
}

export default About;