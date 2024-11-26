import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import bin from '../../../../assets/bin-file.gif'
import edit from '../../../../assets/edit.gif'
import ProjectForm from './ProjectForm'; // Import the ProjectForm component
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
    Select,
    MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';


const Projects = (props) => {
    useNavigate
    const [projects, setProjects] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [editProject, setEditProject] = useState(null); // Project to be edited
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteProject, setDeleteProject] = useState(null); // Project to be deleted
    const [approvalOptions] = useState([
        'Manager Approval',
        'Team Lead Approval',
        'Department Head Approval',
        'Executive Approval',
    ]);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        bgcolor: 'background.paper',
        boxShadow: '24',
        p: '1em 4em',
        borderRadius: '20px'
    };

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:8080/projects'); // Adjust the endpoint as needed
                setProjects(response.data); // Set the projects state with the fetched data
                props.setProject(response.data)
                console.log(response.data)
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        fetchProjects();
    }, []);

    const handleAddProject = (newProject) => {
        setProjects([...projects, newProject]);
        setOpenForm(false);
    };

    const handleOpenForm = () => {
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditProject(null); // Reset edited project state
    };

    const handleEditProject = (project) => {
        setEditProject(project);
        setOpenForm(true); // Open form for editing
    };

    const handleDeleteProject = (project) => {
        setConfirmDelete(true);
        setDeleteProject(project); // Set project to be deleted
    };

    const handleConfirmDelete = async () => {
        let deleteProjectId = deleteProject._id
        try {
            await axios.post('http://localhost:8080/projectsdelete',{deleteProjectId}); // Adjust the endpoint as needed
            const updatedProjects = projects.filter((p) => p.id !== deleteProject.id);
            setProjects(updatedProjects);
            setConfirmDelete(false);
            setDeleteProject(null);
            if(response.status){
                alert(response.data)
            }
            useHistory.push('/');
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    const handleCancelDelete = () => {
        setConfirmDelete(false);
        setDeleteProject(null);
    };

    const handleEditProjectSubmit = async (updatedProject) => {
        try {
            await axios.put(`http://localhost:8080/projects/${updatedProject.id}`, updatedProject); // Adjust the endpoint as needed
            const updatedProjects = projects.map((project) =>
                project.id === updatedProject.id ? updatedProject : project
            );
            setProjects(updatedProjects);
            setEditProject(null);
            handleCloseForm();
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Project Management
            </Typography>
            <Button variant="contained" color="primary" onClick={handleOpenForm}>
                Add Project
            </Button>
            <TableContainer sx={{ width: '100%' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Budget</TableCell>
                            <TableCell>Approval Process</TableCell>
                            <TableCell>Actions(Edit/ Delete)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell>{project.name}</TableCell>
                                <TableCell>{project.description}</TableCell>
                                <TableCell>{format(new Date(project.startdate), 'MMMM dd, yyyy')}</TableCell>
                                <TableCell>{format(new Date(project.enddate), 'MMMM dd, yyyy')}</TableCell>
                                <TableCell>{project.budget}</TableCell>
                                <TableCell>
                                    <Select
                                        value={project.status}
                                        onChange={(e) => {
                                            const updatedProject = { ...project, approvalProcess: e.target.value };
                                            handleEditProjectSubmit(updatedProject);
                                        }}
                                    >
                                        {approvalOptions.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditProject(project)}>
                                        {/* <EditIcon /> */}
                                        <img src={edit} alt="" width='30' height='30' />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteProject(project)}>
                                        {/* <DeleteIcon /> */}
                                        <img src={bin} alt="" width='30' height='30' />
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
                <Box sx={style}>
                    <ProjectForm
                        onAddProject={handleAddProject}
                        onClose={handleCloseForm}
                        editProject={editProject}
                        handleEditProjectSubmit={handleEditProjectSubmit}
                    />
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
                        Are you sure you want to delete this project?
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

export default Projects;