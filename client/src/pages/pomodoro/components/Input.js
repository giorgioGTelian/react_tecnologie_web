import React from 'react';
import { Box, Typography, InputBase } from '@mui/material';

export default function Input({
  id,
  label,
  type = 'text',
  name,
  placeholder,
  className,
  min,
  value,
  onChange,
  onBlur,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
      }}
      className={className}
    >
      {label && (
        <Typography
          component="label"
          htmlFor={id}
          sx={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'rgb(187, 187, 187)',
          }}
        >
          {label}
        </Typography>
      )}

      <InputBase
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        inputProps={{ min }}
        sx={{
          borderRadius: '0.25rem',
          backgroundColor: 'rgb(239, 239, 239)',
          fontSize: '1rem',
          padding: '0.625rem',
          color: 'rgb(85, 85, 85)',
          width: '100%',
          outline: 'none',
          border: '1px solid transparent',
          '&::placeholder': {
            color: 'rgb(189, 189, 189)',
          },
          '&:focus': {
            borderColor: 'rgb(34, 34, 34)',
          },
        }}
      />
    </Box>
  );
}
