import React, { useState } from 'react';
import Task from './Task';
import { Card, CardContent, CardActions, Button, Grid, Typography, IconButton, Snackbar, Alert, Box } from '@mui/material';
import { Delete, CopyAllOutlined } from '@mui/icons-material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const Category = ({ category, tasks, addTask, deleteTask, deleteCategory, toggleComplete, editTask, copyCategory }) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [showToast, setShowToast] = useState(false);
    //ignore isTaskAdded warninng TODO eslint
    const [isTaskAdded, setIsTaskAdded] = useState(false);

    const handleAddTask = () => {
        if (newTaskTitle.trim() !== '') {
            addTask(category.id, newTaskTitle);
            setNewTaskTitle('');
            setIsTaskAdded(true); 
        } else {
            setShowToast(true);
        }
    };

    const handleCloseToast = () => {
        setShowToast(false);
    };

    return (
        <>
            <Card sx={{ width: '100%', mb: 2 }}>
                <CardContent>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h5" component="div">
                                Titolo Nota selezionata: {category.title}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <IconButton color="error" onClick={() => deleteCategory(category.id)}>
                                <Delete />
                            </IconButton>
                            <IconButton color="primary" onClick={() => copyCategory(category.id)}>
                                <CopyAllOutlined />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Typography variant="subtitle2" color="text.secondary">
                        Creata il: {formatDate(category.createdAt)}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        Ultima modifica il: {formatDate(category.updatedAt)}
                    </Typography>
                    <hr />
                    <Typography variant="h6">Testo</Typography>
                    <Box display="flex" justifyContent="center">
                        {tasks && tasks.length > 0 && tasks.map((task) => (
                            <Task
                                key={task.id}
                                task={task}
                                deleteTask={deleteTask}
                                categoryId={category.id}
                                toggleComplete={toggleComplete}
                                editTask={editTask}
                            />
                        ))}
                    </Box>
                </CardContent>
                {(!tasks || tasks.length === 0) && (
                    <CardActions>
                        <Grid container spacing={2} alignItems="center" md={12}>
                            <Grid item xs={12}>
                                <ReactQuill 
                                    theme="snow"
                                    value={newTaskTitle}
                                    onChange={setNewTaskTitle}
                                    style={{ height: '100px', width: '100%' }}
                                />
                            </Grid>
                            <hr />
                            <Grid item xs={12}>
                                <hr />
                                <Button variant="contained" onClick={handleAddTask}>
                                    Aggiungi un testo della nota
                                </Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                )}
            </Card>
            <Snackbar open={showToast} autoHideDuration={3000} onClose={handleCloseToast}>
                <Alert onClose={handleCloseToast} severity="error" sx={{ width: '100%' }}>
                    Campi nulli non accetti
                </Alert>
            </Snackbar>
        </>
    );
};

export default Category;
