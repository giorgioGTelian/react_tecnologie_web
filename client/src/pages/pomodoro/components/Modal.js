import { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Icon from "./Icon";
import { Box, Button } from "@mui/material";

export default function Modal({ children, className }) {
  const modalRef = useRef(null);
  const history = useNavigate();
  const navigate = useNavigate();
  const back = (e) => {
    e.stopPropagation();
    navigate(-1);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        navigate(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navigate]);

  return (
    <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      height: '100%',
      overflowY: 'auto',
      padding: '3rem 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999999,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      transition: 'all 0.2s ease-in',
    }}
  >
      <Box variant="section" />
      <Box variant="section" sx={{
          color: "rgb(34, 34, 34)",
          borderRadius: "0.5rem",
          backgroundColor: "white",
          position: "relative",
          maxWidth: "25rem",
          width: "95%",
          borderTop: "0.0625rem solid rgb(239, 239, 239)",
          borderBottom: "0.0625rem solid rgb(239, 239, 239)",
          margin: "auto",
          boxShadow: "rgba(0, 0, 0, 0.15) 0 0.625rem 1.25rem, rgba(0, 0, 0, 0.1) 0 0.1875rem 0.375rem",
          overflow: "hidden",
          display: "block",
        }} ref={modalRef}>
        {children}
        <Button sx={{
            position: "absolute",
            opacity: 0.3,
            right: 0,
            top: 0,
            width: "3rem",
            height: "3rem",
            borderRadius: "50%",
            margin: "0.4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            },
          }} onClick={back}>
          <Icon name="close" />
        </Button>
      </Box>
    </Box>
  );
}
