import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'

import { TextField, Button, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, Checkbox, ListItemText, OutlinedInput, Box } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const approvalOptions = [
    'Manager Approval',
    'Team Lead Approval',
    'Department Head Approval',
    'Executive Approval',
];

const ProjectForm = ({ onAddProject, onClose, editProject, handleEditProjectSubmit }) => {
    const [projectName, setProjectName] = useState(editProject ? editProject.projectName : '');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [assignedPersonnel, setAssignedPersonnel] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [budget, setBudget] = useState('');
    const [approvalProcess, setApprovalProcess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newProject = {
            name: projectName,
            description,
            location,
            users: assignedPersonnel,
            startdate: startDate,
            enddate: endDate,
            budget,
            status: approvalProcess,
        };
        if (editProject) {
            handleEditProjectSubmit(newProject);
        } else {
            onAddProject(newProject);
        }
        console.log(newProject)
        const response = await axios.post('http://localhost:8080/projectadd',{newProject})
        if(response.status) {
            toast.success(response.data); // Toast the response data
            onClose();
        }
        onClose();
    };

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setAssignedPersonnel(value);
    };

    const handleApprovalChange = (event) => {
        setApprovalProcess(event.target.value);
    };

    const resetForm = () => {
        setProjectName('');
        setDescription('');
        setLocation('');
        setAssignedPersonnel([]);
        setStartDate('');
        setEndDate('');
        setBudget('');
        setApprovalProcess('');
        onClose();
    };

    return (
        <Box sx={{ maxHeight: '80vh', overflowY: 'auto', padding: 2 }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <FormLabel>Project Name</FormLabel>
                            <TextField
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <FormLabel>Description</FormLabel>
                            <TextField
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <FormLabel>Location</FormLabel>
                            <TextField
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <FormLabel>List of Assigned Personnel</FormLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={assignedPersonnel}
                                onChange={handleChange}
                                input={<OutlinedInput label="Assigned Personnel" />}
                                renderValue={(selected) => selected
                                    .join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {names.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            <Checkbox checked={assignedPersonnel.includes(name)} />
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <FormLabel>Start Date</FormLabel>
                                <TextField
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <FormLabel>End Date</FormLabel>
                                <TextField
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <FormLabel>Budget</FormLabel>
                                <TextField
                                    type="number"
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                    required
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="approval-process-label">Approval Process</InputLabel>
                                <Select
                                    labelId="approval-process-label"
                                    id="approval-process"
                                    value={approvalProcess}
                                    onChange={handleApprovalChange}
                                >
                                    {approvalOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                {editProject ? 'Update Project' : 'Create Project'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        );
    };
    
    export default ProjectForm;