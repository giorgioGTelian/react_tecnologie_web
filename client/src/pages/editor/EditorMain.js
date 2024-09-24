import React, { useState, useEffect } from 'react';
import AllTabs from './components/AllTabs';
import MuiAlert from '@mui/material/Alert';
import { Button, AppBar, Toolbar, Grid, Snackbar, Typography, TextField } from '@mui/material';

const EditorMain = () => {
    const [categories, setCategories] = useState([]);
    const [newCategoryTitle, setNewCategoryTitle] = useState('');
    const [showToast, setShowToast] = useState(false);

    /* storage */
    useEffect(() => {
        const categoriesFromStorage = localStorage.getItem('categories');
        if (categoriesFromStorage) {
        setCategories(JSON.parse(categoriesFromStorage));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('categories', JSON.stringify(categories));
    }, [categories]);

    const addCategory = () => {
        if (newCategoryTitle.trim() !== '') {
            const now = new Date();
            setCategories([...categories, { 
                id: Date.now(), 
                title: newCategoryTitle, 
                tasks: [], 
                createdAt: now, 
                updatedAt: now 
            }]);
            setNewCategoryTitle('');
        } else {
            setShowToast(true);
        }
    };

    const hideToast = () => {
        setShowToast(false);
    };

    const deleteCategory = (categoryId) => {
        setCategories(categories.filter((category) => category.id !== categoryId));
    };

    const copyCategory = (categoryId) => {
        const categoryToCopy = categories.find((category) => category.id === categoryId);
        const now = new Date();
        setCategories([
        ...categories,
        {
            ...categoryToCopy,
            id: Date.now(),
            createdAt: now,
            updatedAt: now,
            title: `${categoryToCopy.title} - Copia`,
        },
        ]);
    };

    const addTask = (categoryId, taskTitle) => {
        setCategories(
        categories.map((category) => {
            if (category.id === categoryId) {
            return { ...category, tasks: [...category.tasks, { id: Date.now(), title: taskTitle, completed: false }] };
            } else {
            return category;
            }
        })
        );
    };

    const deleteTask = (categoryId, taskId) => {
        setCategories(
        categories.map((category) => {
            if (category.id === categoryId) {
            return { ...category, tasks: category.tasks.filter((task) => task.id !== taskId) };
            } else {
            return category;
            }
        })
        );
    };

    const editTask = (categoryId, taskId, newTitle) => {
        const now = new Date();
        setCategories(
            categories.map((category) => {
                if (category.id === categoryId) {
                    return {
                        ...category,
                        updatedAt: now,
                        tasks: category.tasks.map((task) =>
                            task.id === taskId ? { ...task, title: newTitle, updatedAt: now } : task
                        ),
                    };
                } else {
                    return category;
                }
            })
        );
    };

    const toggleComplete = (categoryId, taskId) => {
        setCategories(
        categories.map((category) => {
            if (category.id === categoryId) {
            return {
                ...category,
                tasks: category.tasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
                ),
            };
            } else {
            return category;
            }
        })
        );
    };


    

    

    return (
        <>
        <div className="main_content">
            <AppBar position="static" color="transparent" className="navbar-header">
            <Typography variant="h2" align="center">Note</Typography>
            <Toolbar>
                <Grid container justifyContent="center">
                <Grid item xs="auto">
                    <TextField
                    variant="outlined"
                    label="Aggiungi una nota..."
                    value={newCategoryTitle}
                    onChange={(e) => setNewCategoryTitle(e.target.value)}
                    className="me-2"
                    size="small"
                    style={{ margin: '8px' }}
                    />
                </Grid>
                <Grid item xs="auto">
                    <Button  variant="contained" color="primary" onClick={addCategory} style={{ margin: '10px' }}>
                    Aggiungi Nota
                    </Button>
                </Grid>
                </Grid>
            </Toolbar>
            </AppBar>
            <div className="w-100 h-100">
            <AllTabs
                className="w-100 h-100"
                categories={categories}
                addTask={addTask}
                deleteTask={deleteTask}
                deleteCategory={deleteCategory}
                editTask={editTask}
                toggleComplete={toggleComplete}
                copyCategory={copyCategory}
            />
            {showToast && (
                <Snackbar open={showToast} autoHideDuration={3000} onClose={hideToast}>
                <MuiAlert onClose={hideToast} severity="warning" elevation={6} variant="filled">
                    Non è possibile inserire un campo vuoto!
                </MuiAlert>
                </Snackbar>
            )}
            </div>
        </div>
        </>
    );
};

export default EditorMain;
