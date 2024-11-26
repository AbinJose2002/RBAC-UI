import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import bin from '../../../../assets/bin-file.gif';
import edit from '../../../../assets/edit.gif';
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
    TextField, // Import TextField for search input
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Projects = (props) => {
    const navigate = useNavigate(); // Corrected useNavigate usage
    const [projects, setProjects] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [editProject, setEditProject] = useState(null); // Project to be edited
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteProject, setDeleteProject] = useState(null); // Project to be deleted
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
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
        borderRadius: '20px',
    };

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:8080/projects'); // Adjust the endpoint as needed
                setProjects(response.data); // Set the projects state with the fetched data
                props.setProject(response.data);
                console.log(response.data);
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
        let deleteProjectId = deleteProject._id;
        try {
            await axios.post('http://localhost:8080/projectsdelete', { deleteProjectId }); // Adjust the endpoint as needed
            const updatedProjects = projects.filter((p) => p.id !== deleteProject.id);
            setProjects(updatedProjects);
            setConfirmDelete(false);
            setDeleteProject(null);
            navigate('/'); // Use navigate instead of useHistory
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

    const background = {
        backgroundColor: 'white',
        borderRadius: '20px',
    };

    const inline = {
        display: 'inline-block',
    };

    // Filter projects based on the search query
    const filteredProjects = projects.filter((project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ padding: '20px' }}>
            <span style={inline}>
                <Typography variant="h4" gutterBottom>
                    Project Management
                </Typography>
                <Button className='mb-4' variant="contained" color="primary" onClick={handleOpenForm}>
                    Add Project
                </Button>
            </span>

            {/* Search Field */}
            <br />
            <TextField
                variant="outlined"
                placeholder="Search Projects"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginBottom: '20px', width: '300px', backgroundColor: 'white' }} // Adjust width as needed
            />

            <TableContainer style={background} sx={{ width: '100%' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Budget</TableCell>
                            <TableCell>Approval Process</TableCell>
                            <TableCell>Actions (Edit/Delete)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProjects.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell>{project.name}</TableCell>
                                <TableCell>{project.description}</TableCell>
                                <TableCell>{format(new Date(project.startdate), 'MMMM dd, yyyy')}</TableCell>
                                <TableCell>{format(new Date(project.enddate), 'MMMM dd, yyyy')}</TableCell>
                                <TableCell>{project.budget}</TableCell>
                                <TableCell>
                                    <Select
                                        value={project.approvalProcess}
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
                                        <img src={edit} alt="Edit" width='30' height='30' />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteProject(project)}>
                                        <img src={bin} alt="Delete" width='30' height='30' />
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