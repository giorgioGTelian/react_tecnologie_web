import React, { version } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

//create an about page of the appliction version of node react and js
const About = () => {
    return (
        <>
        <Box mt={2} p={10}>
        <br />
        <h1>About</h1>
        <p>Application version 1.0 </p>
        <p>React Version: {version}</p>
        <Link to="/">Vai alla homepage</Link>
        <br />
        <Link to="/calendar">Vai al calendario</Link>
        </Box>
        </>
    )
}

export default About;