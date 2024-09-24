import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Box, Typography } from "@mui/material";

export default function Logo() {
  return (
    <Typography
      component="h1"
      sx={{
        padding: "0.625rem 0",
        fontSize: "1.25rem",
        verticalAlign: "middle",
      }}
    >
      <Box
        component={Link}
        to="/"
        sx={{
          display: "flex",
          gap: "0.25rem",
          alignItems: "center",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="pomofocus-logo"
          sx={{
            width: "1.25rem",
            height: "1.25rem",
          }}
        />
        Pomodoro Timer
      </Box>
    </Typography>
  );
}