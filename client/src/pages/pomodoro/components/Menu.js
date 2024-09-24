import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, Paper } from "@mui/material";


export function MenuItem({ children, src, onClick }) {
  return (
    <Button
    onClick={onClick}
    sx={{
      borderRadius: 0,
      color: "rgb(79, 43, 45)",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "0.625rem 1rem",
      fontSize: "0.875rem",
      gap: "0.5rem",
      backgroundColor: "transparent",
      cursor: "pointer",
      width: "100%",
      "&:hover": {
        backgroundColor: "rgb(241, 238, 238)",
      },
    }}
  >
    {!!src && (
      <Box
        component="img"
        src={src}
        alt=""
        sx={{
          width: "0.875rem",
          opacity: 0.8,
        }}
      />
    )}
    {children}
  </Button>
  );
}

export default function Menu({ children, menuButton }) {
  const containerRef = useRef();
  const [visible, setVisible] = useState(false);
  const onDismiss = useCallback(() => setVisible(false), []);
  const handleToggle = useCallback(() => setVisible((prev) => !prev), []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Box
    sx={{
      position: "relative",
      display: "inline-block",
    }}
    ref={containerRef}
  >
      {menuButton(handleToggle)}
      {visible && (
        <Paper
        onClick={onDismiss}
        sx={{
          borderRadius: "0.25rem",
          padding: "0.25rem 0",
          boxShadow:
            "rgba(0, 0, 0, 0.15) 0 0.625rem 1.25rem, rgba(0, 0, 0, 0.1) 0 0.1875rem 0.375rem",
          position: "absolute",
          backgroundColor: "white",
          transform: "translateY(0.625rem)",
          width: "12.5rem",
          height: "fit-content",
          flexDirection: "column",
          display: "flex",
          top: "100%",
          right: 0,
          zIndex: 99,
        }}
      >
          {children}
        </Paper>
      )}
    </Box>
  );
}
