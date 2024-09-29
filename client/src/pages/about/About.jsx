import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Grid, Container } from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const About = () => {
    const [labels, setLabels] = useState({
        birthdate: 'Birthdate',
        city: 'City',
        state: 'State',
        country: 'Country',
        occupation: 'Occupation',
        phoneNumber: 'Phone Number',
        notes: 'Notes'
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

                // Decode the JWT to get the user ID
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userId; // Adjust this based on your token structure
                console.log('User ID:', userId);
                console.log('Token:', token);
                console.log('Decoded Token:', decodedToken);

                // Fetch the user data from the backend
                const response = await axios.get(`/user-profile/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    const userData = response.data;
                    setLabels({
                        birthdate: userData.birthdateLabel || 'Birthdate',
                        city: userData.cityLabel || 'City',
                        state: userData.stateLabel || 'State',
                        country: userData.countryLabel || 'Country',
                        occupation: userData.occupationLabel || 'Occupation',
                        phoneNumber: userData.phoneNumberLabel || 'Phone Number',
                        notes: userData.notesLabel || 'Notes'
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

        // Retrieve the JWT from local storage
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        // Decode the JWT to get the user ID
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId; 

        try {
            const response = await axios.put(`/update-profile/${userId}`, updatedData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.status === 200) {
                console.log('Profile updated successfully');
                // Handle success (e.g., redirect to profile page)
            } else {
                console.error('Error updating profile');
            }
        } catch (error) {
            console.error('Unexpected error:', error);
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
        <Typography component="h1" variant="h5">Update Profile</Typography>
                <Box component="form" noValidate onSubmit={handleProfileUpdate} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth autoFocus name="birthdate" label={labels.birthdate} type="date" InputLabelProps={{ shrink: true }} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField name="city" label={labels.city} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField name="state" label={labels.state} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField name="country" label={labels.country} />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField name="occupation" label={labels.occupation} />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField name="phoneNumber" label={labels.phoneNumber} />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField name="notes" label={labels.notes} multiline />
                        </Grid>
                        <Box sx={{ justifyContent: 'center' }}>
                            <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>Update Profile</Button>
                        </Box>
                    </Grid>
                </Box>
        </Box>
        </Container>
        </>
    )
}

export default About;