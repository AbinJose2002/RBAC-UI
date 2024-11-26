import React, { useState, useEffect } from 'react';
import edit from '../../../../assets/edit.gif';
import bin from '../../../../assets/bin-file.gif';
import {
    Button,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Modal,
    Box,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import axios from 'axios';

const Permission = () => {
    const [permissions, setPermissions] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [editPermission, setEditPermission] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deletePermission, setDeletePermission] = useState(null);
    const [permissionName, setPermissionName] = useState('');
    const [permissionDescription, setPermissionDescription] = useState('');
    const [permissionType, setPermissionType] = useState('read'); // Default type

    useEffect(() => {
        fetchPermissions();
    }, []);

    const fetchPermissions = async () => {
        try {
            const response = await axios.get('http://localhost:8080/permissions'); // Adjust the endpoint as needed
            setPermissions(response.data.data);
        } catch (error) {
            console.error("Error fetching permissions:", error);
        }
    };

    const handleOpenForm = () => {
        setOpenForm(true);
        setEditPermission(null);
        setPermissionName('');
        setPermissionDescription('');
        setPermissionType('read'); // Reset to default type
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditPermission(null);
        setPermissionName('');
        setPermissionDescription('');
        setPermissionType('read'); // Reset to default type
    };

    const handleAddOrEditPermission = async () => {
        const permissionData = {
            name: permissionName,
            description: permissionDescription,
            type: permissionType, // Include the permission type
        };

        if (editPermission) {
            // Edit existing permission
            try {
                await axios.put(`http://localhost:8080/permissions/${editPermission.id}`, permissionData);
                fetchPermissions();
            } catch (error) {
                console.error("Error updating permission:", error);
            }
        } else {
            // Add new permission
            try {
                console.log(permissionData)
                await axios.post('http://localhost:8080/permissionsadd', permissionData);
                fetchPermissions();
            } catch (error) {
                console.error("Error adding permission:", error);
            }
        }
        handleCloseForm();
    };

    const handleEditPermission = (permission) => {
        setEditPermission(permission);
        setPermissionName(permission.name);
        setPermissionDescription(permission.description);
        setPermissionType(permission.type); // Set the type for editing
        setOpenForm(true);
    };

    const handleDeletePermission = (permission) => {
        setConfirmDelete(true);
        setDeletePermission(permission);
    };

    const handleConfirmDelete = async () => {
        try {
            const deleteId = deletePermission._id;
            await axios.post('http://localhost:8080/permissionsdelete', { deleteId });
            fetchPermissions();
        } catch (error) {
            console.error("Error deleting permission:", error);
        }
        setConfirmDelete(false);
        setDeletePermission(null);
    };

    const handleCancelDelete = () => {
        setConfirmDelete(false);
        setDeletePermission(null);
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Permission Management
            </Typography>
            <Button variant="contained" color="primary" onClick={handleOpenForm}>
                Add Permission
            </Button>
            <TableContainer style={{ marginTop: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Actions (Edit/Delete)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {permissions.map((permission) => (
                            <TableRow key={permission.id}>
                                <TableCell>{permission.name}</TableCell>
                                <TableCell>{permission.description}</TableCell>
                                <TableCell>{permission.type}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditPermission(permission)}>
                                        <img src={edit} alt="" width='25' height='25' />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeletePermission(permission)}>
                                        <img src={bin} alt="" width='25' height='25' />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal
                open={openForm}
                onClose={handleCloseForm}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box 
                    sx={{ 
                        padding: '20px', 
                        backgroundColor: 'white', 
                        borderRadius: '10px', 
                        width: { xs: '80%', sm: '60%', md: '40%' }, // Responsive width
                        margin: 'auto', // Center the modal
                        marginTop: '10%', // Add some top margin
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        {editPermission ? 'Edit Permission' : 'Add New Permission'}
                    </Typography>
                    
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="permission-type-label">Permission Type</InputLabel>
                        <Select
                            labelId="permission-type-label"
                            value={permissionType}
                            onChange={(e) => setPermissionType(e.target.value)}
                        >
                            <MenuItem value="read">Read</MenuItem>
                            <MenuItem value="write">Write</MenuItem>
                            <MenuItem value="delete">Delete</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="Permission Name"
                        value={permissionName}
                        onChange={(e) => setPermissionName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Permission Description"
                        value={permissionDescription}
                        onChange={(e) => setPermissionDescription(e.target.value)}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4} // Allow for multiple lines
                    />
                    <Button variant="contained" color="primary" onClick={handleAddOrEditPermission}>
                        {editPermission ? 'Update' : 'Add'}
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleCloseForm} style={{ marginLeft: '10px' }}>
                        Cancel
                    </Button>
                </Box>
            </Modal>

            <Dialog
                open={confirmDelete}
                onClose={handleCancelDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this permission?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Permission;