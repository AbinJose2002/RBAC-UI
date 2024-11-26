const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const User = mongoose.model('User ', userSchema);

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    users: {type: Array},
    startdate: { type: Date, required: true },
    enddate: { type: Date, required: true },
    budget: { type: Number, required: true },
    status: { type: String, default: 'pending' } // Default status
});

const Project = mongoose.model('Project', projectSchema);

app.post('/projectadd', async (req, res) => {
    const { name, description, location, users, startdate, enddate, budget, status } = req.body.newProject;
    try {
        // Create a new project instance
        const newProject = new Project({
            name,
            description,
            location,
            users,
            startdate,
            enddate,
            budget,
            status
        });


        // Save the project to the database
        await newProject.save();

        // Respond with the created project
        res.status(201).json({ message: 'Project created successfully', project: newProject });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ message: 'Error creating project', error: error.message });
    }
});

app.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find({}); // Fetch all projects from the database
        res.status(200).json(projects); // Send the projects as a JSON response
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Internal server error" }); // Send an error response
    }
});

app.post('/projectsdelete', async (req,res) => {
    const  deleteId = req.body.deleteProjectId
    try {
        await Project.findByIdAndDelete({deleteId})
        res.status(200).json({message: 'Delete Successfull'})
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'})
    }
})

app.get('/', (req, res) => {
    res.send('hi');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});