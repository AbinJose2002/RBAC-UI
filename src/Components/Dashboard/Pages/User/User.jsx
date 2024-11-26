import React, { useState, useEffect } from 'react';
import bin from '../../../../assets/bin-file.gif';
import edit from '../../../../assets/edit.gif';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Typography
} from '@mui/material';
import axios from 'axios';
import './User.css';

export default function User() {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', role: '' });
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    // Fetch users and roles on component mount
    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:8080/users');
        setUsers(response.data.data);
        console.log(response.data.data);
    };

    const fetchRoles = async () => {
        const response = await axios.get('http://localhost:8080/roles');
        const data = await response.data.data;
        setRoles(data);
    };

    const handleOpen = () => {
        setOpen(true);
        setIsEditing(false);
        setFormData({ name: '', email: '', role: '' });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            // Update user
            await fetch(`http://localhost:8080/users/${selectedUserId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
        } else {
            // Add new user
            await axios.post('http://localhost:8080/usersadd', formData);
        }
        fetchUsers();
        handleClose();
    };

    const handleEdit = (user) => {
        setFormData({ name: user.name, email: user.email, role: user.role });
        setSelectedUserId(user.id);
        setIsEditing(true);
        setOpen(true);
    };

    const handleDelete = async (userId) => {
        await fetch(`http://localhost:8080/users/${userId}`, {
            method: 'DELETE',
        });
        fetchUsers();
    };

    // Filter users based on the search query
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Users
            </Typography>
            <Button variant="contained" color="primary" onClick={handleOpen} className='mb-3'>
                Add User
            </Button>

            {/* Search Field */}
            <br />
            <TextField
                variant="outlined"
                placeholder="Search Users"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginBottom: '20px', width: '300px', backgroundColor: 'white' }} // Adjust width as needed
            />

            <TableContainer className='user-container'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                <IconButton onClick={() => handleEdit(user)}>
                                        <img src={edit} width='25' height='25' alt="Edit" />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(user.id)}>
                                        <img src={bin} width='25' height='25' alt="Delete" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{isEditing ? 'Edit User' : 'Add User'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Role</InputLabel>
                        <Select
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                        >
                            {roles.map((role) => (
                                <MenuItem key={role.id} value={role.name}>
                                    {role.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {isEditing ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}