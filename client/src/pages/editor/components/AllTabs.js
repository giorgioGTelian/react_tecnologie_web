import React, { useState } from 'react';
import { Tabs, Tab, AppBar, Drawer, IconButton, List, ListItem, ListItemText, Box, Grid, Typography, TextField } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Category from './Category';
import { useMediaQuery } from 'react-responsive';

const AllTabs = ({ categories, addTask, deleteTask, deleteCategory, toggleComplete, editTask, copyCategory }) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });
    const [activeTab, setActiveTab] = useState(categories[0]?.id || '');
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        setDrawerOpen(false);
    };
    const [sortOption, setSortOption] = useState('alphabetical');

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const sortedCategories = [...categories].sort((a, b) => {
        if (sortOption === 'alphabetical') {
            return a.title.localeCompare(b.title);
        } else if (sortOption === 'createdAt') {
            return new Date(a.createdAt) - new Date(b.createdAt);
        } else if (sortOption === 'contentLength') {
            return b.tasks.length - a.tasks.length;
        }
        return 0;
    });


    return (
        <>
        {isTabletOrMobile && (
            <AppBar position="static" className="mb-3">
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(!drawerOpen)}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <List>
                {categories.map((category) => (
                    <ListItem
                    button
                    key={category.id}
                    onClick={() => handleTabChange(null, category.id)}
                    >
                    <ListItemText primary={category.title} />
                    </ListItem>
                ))}
                </List>
            </Drawer>
            </AppBar>
        )}

        {isTabletOrMobile && (
            <Box sx={{ width: '100%', height: '100%' }}>
            <Grid container>
                <Grid item xs={12}>
                <Box sx={{ p: 2 }}>
                    {categories.map((category) => (
                    activeTab === category.id && (
                        <Category
                        key={category.id}
                        category={category}
                        tasks={category.tasks}
                        addTask={addTask}
                        deleteTask={deleteTask}
                        deleteCategory={deleteCategory}
                        toggleComplete={toggleComplete}
                        editTask={editTask}
                        copyCategory={copyCategory}
                        />
                    )
                    ))}
                </Box>
                </Grid>
            </Grid>
            </Box>
        )}

        {isDesktopOrLaptop && (
            <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ width: '25%', borderRight: 1, borderColor: 'divider', p: 2 }}>
                <Typography>Elenco delle Note</Typography>
                <Grid item xs={12}>
                <TextField
                    select
                    label="Ordina per"
                    value={sortOption}
                    onChange={handleSortChange}
                    SelectProps={{
                        native: true,
                    }}
                    variant="outlined"
                    fullWidth
                >
                    <option value="alphabetical">Ordine alfabetico</option>
                    <option value="createdAt">Data di creazione</option>
                    <option value="contentLength">Lunghezza del contenuto</option>
                </TextField>
            </Grid>

            <Tabs
                orientation="vertical"
                value={activeTab}
                onChange={handleTabChange}
                aria-label="category tabs"
            >
                {sortedCategories.map((category) => (
                    <Tab key={category.id} label={category.title} value={category.id} />
                ))}
            </Tabs>

            </Box>
            <Box sx={{ width: '75%', p: 2 }}>
                {categories.map((category) => (
                activeTab === category.id && (
                    <Category
                    key={category.id}
                    category={category}
                    tasks={category.tasks}
                    addTask={addTask}
                    deleteTask={deleteTask}
                    deleteCategory={deleteCategory}
                    toggleComplete={toggleComplete}
                    editTask={editTask}
                    copyCategory={copyCategory}
                    />
                )
                ))}
            </Box>
            </Box>
        )}
        </>
    );
};

export default AllTabs;
