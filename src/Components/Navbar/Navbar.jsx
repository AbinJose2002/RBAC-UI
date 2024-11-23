import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './Navbar.css'

export default function Navbar() {
    const [project, setProject] = React.useState('');

    const handleChange = (event) => {
        setProject(event.target.value);
        console.log(project);
        
    };
    return (
        <nav class="navbar navbar-expand-lg ">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Admin Dashboard</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                        <li class="nav-item dropdown">
                            <div>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Select Project</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={project}
                                        onChange={handleChange}
                                        label="project"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={1}>Project 1</MenuItem>
                                        <MenuItem value={2}>Project 2</MenuItem>
                                        <MenuItem value={3}>Project 3</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </li>
                    </ul>
                    <form class="d-flex" role="search">
                        <button class="btn btn-outline-success" type="submit" onClick={() => { alert('Logged Out. Token Cleared') }}>Log Out</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}
