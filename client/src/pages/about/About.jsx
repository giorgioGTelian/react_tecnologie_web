import React, { version } from 'react';
import { Box, TextField, Button, Typography, Grid, Container } from '@mui/material';
import axios from 'axios';

//create an about page of the appliction version of node react and js
const About = () => {
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

        try {
            const response = await axios.put(`/update-profile/`, updatedData, { //${userId} - TODO: add the user ID
                headers: {
                    'Content-Type': 'application/json',
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
                <TextField fullWidth autoFocus name="birthdate" label="Birthdate" type="date" InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField name="city" label="City" fullWidth/>
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField name="state" label="State" fullWidth/>
            </Grid>
            <Grid item xs={12} sm={3}>
            <TextField name="country" label="Country" />
            </Grid>
            <Grid item xs={12} sm={3}>
            <TextField name="occupation" label="Occupation" />
            </Grid>
            <Grid item xs={12} sm={3}>
            <TextField name="phoneNumber" label="Phone Number" />
            </Grid>
            <Grid item xs={12} sm={3}>
            <TextField name="notes" label="Notes" multiline />
            </Grid>
            <Box sx={{  justifyContent: 'center' }}>
            <Button type="submit" variant="contained" color="primary"sx={{ mt: 3, mb: 2 }}>Update Profile</Button>
            </Box>
        </Grid>
        </Box>
        </Box>
        </Container>
        </>
    )
}

export default About;