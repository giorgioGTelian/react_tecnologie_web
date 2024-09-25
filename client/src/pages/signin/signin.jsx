import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Copyright(props) {
return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" component={Link} to="https://giorgiogt.net" >
        fatto da giorgio e luna
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
        </Typography>
    );
}



export default function SignIn() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = data.get('name');
        const password = data.get('password');

        console.log({
            name: name,
            password: password,
        });

        // set configurations
    const configuration = {
        method: "post",
        url: "http://localhost:9000/login", //TODO: change this to your own server
        data: {
            name,
            password,
        },
    };
    
       // make the API call
    try {
        const response = await axios(configuration);
        console.log('Success:', response);
        setRegister(true);
        navigate('/about'); 
    } catch (error) {
        console.error('Error:', error);
    }
    };

return (
    <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
            backgroundImage: 'url(https://img.freepik.com/premium-photo/sloth-touches-camera-taking-selfie-funny-selfie-portrait-animal_323015-1968.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            
            backgroundPosition: 'center',
            }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
            sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                SELFIE
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="nome utente"
                name="name"
                autoComplete="name"
                autoFocus
                value={name} // added this
                onChange={e => setName(e.target.value)}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password} // added this
                onChange={e => setPassword(e.target.value)} 
                />
                <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Ricordami"
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Entra
                </Button>
                <Grid container>
                <Grid item xs>
                    <Link component={Link} to="/password-reset" variant="body2">
                    {"Dimenticata Password?"}
                    </Link>
                </Grid>
                <Grid item>
                    <Link component={Link} to="/registrati" variant="body2">
                    {"Registrati"}
                    </Link>
                </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
            </Box>
            </Box>
        </Grid>
        </Grid>
    );
}