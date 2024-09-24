import React, { useState } from 'react';
import { IconButton, Grid, ButtonGroup, Typography, Box } from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Task = ({ task, categoryId, editTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);

    const handleSave = () => {
        if (!task.completed) {
        editTask(categoryId, task.id, newTitle);
        setIsEditing(false);
        }
    };

    return (
        <Grid container alignItems="center" spacing={2} className="task-item">
        <Grid item xs>
            <Box display="flex" flexDirection="column" alignItems="center">
                {isEditing ? (
                    <ReactQuill 
                        theme="snow"
                        value={newTitle}
                        onChange={setNewTitle}
                        style={{ height: '100px', width: '100%' }}
                    />
                ) : (
                    <Typography className={task.completed ? 'completed' : ''} dangerouslySetInnerHTML={{ __html: task.title }}>
                    </Typography>
                )}
            </Box>
        </Grid>
        <Grid item>
            <ButtonGroup>
                <IconButton color="primary" onClick={() => setIsEditing(!isEditing)}>
                    <EditIcon />
                </IconButton>
                {isEditing && (
                    <IconButton color="secondary" onClick={handleSave}>
                        <SaveIcon />
                    </IconButton>
                )}
            </ButtonGroup>
        </Grid>
    </Grid>
    );
};

export default Task;
