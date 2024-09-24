import { ListItemButton, ListItemIcon } from "@mui/material";
import { Link } from "react-router-dom";


const SidebarItem = ({ item }) => {


    // Ensure item.path is always an array
    const paths = Array.isArray(item.path) ? item.path : [item.path];

    return (
        item.sidebarProps && paths.length > 0 ? (
        <ListItemButton
            component={Link}
            to={paths[0]} // Use the first path as the link destination
            sx={{
            paddingY: "12px",
            paddingX: "24px"
            }}
            >
            <ListItemIcon sx={{
            }}>
            {item.sidebarProps.icon && item.sidebarProps.icon}
            </ListItemIcon>
            {item.sidebarProps.displayText}
        </ListItemButton>
        ) : null
    );
};

export default SidebarItem;