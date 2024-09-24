import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import Logo from './Logo';
import Icon from './Icon';

function CustomButton({ icon, children, onClick }) {
  const isLargeScreen = useMediaQuery('(min-width: 992px)');

  return (
    <Button
      onClick={onClick}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.9,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: 'white',
        padding: isLargeScreen ? '0.5rem 0.75rem' : '0.5rem',
        minWidth: isLargeScreen ? '4.375rem' : 'auto',
        gap: '0.25rem',
        transition: 'transform 0.1s ease-in-out',
        '&:hover': {
          opacity: 1,
        },
        '&:active': {
          transform: 'translateY(0.125rem)',
        },
      }}
    >
      <Icon name={icon} />
      {isLargeScreen && (
        <Typography component="span" sx={{ display: 'block' }}>
          {children}
        </Typography>
      )}
    </Button>
  );
}

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        padding: '0 0.75rem',
        maxWidth: '38.75rem',
        margin: 'auto',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '3.75rem',
        }}
      >
        <Logo />
        <Box
          component="ul"
          sx={{
            display: 'flex',
            gap: '0.625rem',
            alignItems: 'center',
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          <Box component="li">
            <Link to="/settings">
              <CustomButton icon="settings">Setting</CustomButton>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
