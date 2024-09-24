import React from "react";
import Header from "./components/Header";
import Timer from "./components/Timer";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import "./Pomodoro.css";

function Pomodoro() {
  const mode = useSelector((state) => state.timer.mode);

  const getBackgroundColor = (mode) => {
    switch (mode) {
      case "short_break":
        return "var(--secondary-color)";
      case "long_break":
        return "var(--tertiary-color)";
      default:
        return "var(--primary-color)";
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        backgroundColor: getBackgroundColor(mode),
        paddingBottom: "0.75rem",
        color: "white",
        transition: "background-color 0.5s ease-in-out 0s",
      }}
    >
      <Header />
      <Box
        sx={{
          padding: "0 0.75rem",
          maxWidth: "38.75rem",
          width: "100%",
          fontWeight: 300,
          display: "flex",
          flexGrow: 1,
          alignSelf: "center",
          flexDirection: "column",
        }}
      >
        <Timer />
      </Box>
    </Box>
  );
}

export default Pomodoro;