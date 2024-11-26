import React, { useState, useEffect } from 'react';
import edit from '../../../../assets/edit.gif'
import bin from '../../../../assets/bin-file.gif'
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
    DialogActions,
    TextField,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const Roles = () => {
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [editRole, setEditRole] = useState(null);
    const [roleName, setRoleName] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState([]);

    useEffect(() => {
        fetchRoles();
        fetchPermissions();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await axios.get('http://localhost:8080/roles');
            setRoles(response.data.data);
        } catch (error) {
            console.error("Error fetching roles:", error);
        }
    };

    const fetchPermissions = async () => {
        try {
            const response = await axios.get('http://localhost:8080/permissions');
            setPermissions(response.data.data)
        } catch (error) {
            console.error("Error fetching permissions:", error);
        }
    };

    const handleOpenForm = () => {
        setOpenForm(true);
        setEditRole(null);
        setRoleName('');
        setSelectedPermissions([]);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditRole(null);
        setRoleName('');
        setSelectedPermissions([]);
    };


    const handleAddOrEditRole = async () => {
        const roleData = {
            name: roleName,
            permissions: selectedPermissions,
        };

        if (editRole) {
            // Edit existing role
            try {
                await axios.put(`http://localhost:8080/roles/${editRole.id}`, roleData);
                fetchRoles();
            } catch (error) {
                console.error("Error updating role:", error);
            }
        } else {
            // Add new role
            try {
                await axios.post('http://localhost:8080/rolesadd', roleData);
                fetchRoles();
            } catch (error) {
                console.error("Error adding role:", error);
            }
        }
        handleCloseForm();
    };

    const handleEditRole = (role) => {
        setEditRole(role);
        setRoleName(role.name);
        setSelectedPermissions(role.permissions.map(permission => permission._id)); // Ensure you're using the correct ID
        setOpenForm(true);
    };

    const handleDeleteRole = async (role) => {
        try {
            await axios.delete(`http://localhost:8080/roles/${role.id}`);
            fetchRoles();
        } catch (error) {
            console.error("Error deleting role:", error);
        }
    };

    const handlePermissionChange = (permissionId) => {
        setSelectedPermissions((prev) => {
            if (prev.includes(permissionId)) {
                return prev.filter(id => id !== permissionId);
            } else {
                return [...prev, permissionId];
            }
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Role Management
            </Typography>
            <Button variant="contained" color="primary" onClick={handleOpenForm}>
                Add Role
            </Button>
            <TableContainer style={{ marginTop: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Permissions</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {roles.map((role) => (
                            <TableRow key={role.id}>
                                <TableCell>{role.name}</TableCell>
                                <TableCell>
                {role.permissions.map(p => {
                    const foundPermission = permissions.find(per => per._id === p);
                    if (foundPermission) {
                        return `${foundPermission.name} (${foundPermission.type})`; // Combine name and type with separator
                    } else {
                        console.warn(`Permission with ID ${p} not found in permissions array.`);
                        return null; // Or return a placeholder value
                    }
                }).filter(Boolean).join(', ')} {/* Filter out null values */}
            </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditRole(role)}>
                                        <img src={edit} width='25' height='25'/>
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteRole(role)}>
                                        <img src={bin} width='25' height='25'/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openForm} onClose={handleCloseForm}>
                <DialogContent>
                    <Typography variant="h6" gutterBottom>
                        {editRole ? 'Edit Role' : 'Add New Role'}
                    </Typography>
                    <TextField
                        label="Role Name"
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Typography variant="subtitle1" gutterBottom>
                        Select Permissions:
                    </Typography>
                    {permissions.map((permission) => (
                        <FormControlLabel
                            key={permission.id}
                            control={
                                <Checkbox
                                    checked={selectedPermissions.includes(permission._id)} // Ensure correct ID reference
                                    onChange={() => handlePermissionChange(permission._id)}
                                />
                            }
                            label={`${permission.name}: ${permission.type}`} // Display permission name and type
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseForm} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddOrEditRole} color="primary">
                        {editRole ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Roles;