import React from "react";
import { Box } from "@mui/material";

export default function Progress({ percent }) {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        height: "0.0625rem",
        marginBottom: "2.5rem",
      }}
    >
      <Box
        sx={{
          height: "0.1875rem",
          borderRadius: "6.25rem",
          backgroundColor: "white",
          transform: "translateY(-0.0625rem)",
          width: `${percent}%`,
        }}
      />
    </Box>
  );
}