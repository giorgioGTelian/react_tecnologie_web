import React, { useState } from "react";
import { Link } from 'react-router-dom';
import {
    Menu as MenuIcon,
    ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import profileImage from "../assets/me.png";
import {
    AppBar,
    Button,
    Box,
    Typography,
    IconButton,
    Toolbar,
    Menu,
    MenuItem,
    useTheme,
    Avatar,
    Divider,
    ListItemIcon,
} from "@mui/material";
import { Logout } from "@mui/icons-material";


const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
    const theme = useTheme();
    
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    
return (
    <AppBar
    sx={{
        position: "static !important",
        background: "none",
        boxShadow: "none",
    }}
    >
    <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
        <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
        </IconButton>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
        <FlexBetween >
            <Button
            onClick={handleClick}
            sx={{
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                color: theme.palette.secondary[100],
                gap: "0.5rem",
            }}
            >
            <Box textAlign="left">
                <Typography
                fontWeight="bold"
                fontSize="0.85rem"
                sx={{ color: theme.palette.secondary.dark }}
                >
                </Typography>
                <Typography
                fontSize="0.75rem"
                sx={{ color: theme.palette.dark }}
                >
                </Typography>
            </Box>
            <Avatar src={profileImage} /> <Typography >
                {user.name}
            </Typography>
            <ArrowDropDownOutlined
                
            />
            </Button>
            <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            PaperProps={{
                elevation: 0,
            sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                paddingRight: '0 !important',
                '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
                color: theme.palette.secondary[100],
                },
            },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                <MenuItem >
                    <Avatar src={profileImage} /> {user.name}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                </MenuItem>
                    <MenuItem onClick={handleClose}> {/* Logout TODO */}
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                    <Link to="/">Logout</Link>
                </MenuItem>
            </Menu>
        </FlexBetween>
        </FlexBetween>
    </Toolbar>
    </AppBar>
);
};

export default Navbar;
