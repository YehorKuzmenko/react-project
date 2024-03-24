import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function ModalComponent({show, handleClose, name, handleAddUpdateTask, prevCategory, prevDate}) {

    const [title, setTitle] = useState(name);
    const [category, setCategory] = useState(prevCategory);
    const [date, setDate] = useState(prevDate);

    const handleTaskEvent = () => {
        handleAddUpdateTask(title, category, date);
        setTitle('');
        setCategory('');
        setDate('');
        handleClose();
    }

    return (
        <Modal
            open={show}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4}}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {name === '' ? 'Add Task' : name}

                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <input
                        type="text"
                        placeholder="Task"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                    <select
                        value={category}
                        onChange={event => setCategory(event.target.value)}
                    >
                        <option value="" disabled={true}>Select category</option>
                        <option value="work">Work</option>
                        <option value="email">Email</option>
                        <option value="important">Important</option>
                    </select>
                    <input
                        type="date"
                        value={date}
                        onChange={event => setDate(event.target.value)}
                    />
                    <button onClick={handleTaskEvent}>{name === '' ? 'Add' : 'Update'}</button>
                </Typography>
            </Box>
        </Modal>
    );
}

export default ModalComponent;