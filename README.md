# User Management System

## Project Overview

The User Management System is a comprehensive web application designed to streamline the management of users, roles, permissions, and projects within an organization. This application provides a robust dashboard that allows administrators and managers to easily navigate through user data, manage roles, assign permissions, and oversee projects efficiently.

### Key Features

- **Dashboard**: A central hub that provides an overview of user statistics, project statuses, and role distributions.
- **User  Management**: Create, read, update, and delete user profiles. Users can be assigned specific roles and permissions, facilitating effective access control.
- **Role Management**: Define and manage roles within the system. Each role can have specific permissions associated with it, allowing for granular control over what users can access and modify.
- **Permission Panels**: Set up and manage permissions for different roles, ensuring that users have the appropriate access levels based on their responsibilities.
- **Project Management**: Create and manage projects, assign users to projects, and track project progress.

## Technologies Used

- **Frontend**: React, Material-UI
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **State Management**: Redux (if applicable)
- **HTTP Client**: Axios

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/AbinJose2002/RBAC-UI

2. **Navigate to the Project Directory:**:

   ```bash
   cd RBAC-UI
   
3. **Install Frontend Dependencies:**:

   ```bash
   cd frontend
   npm install

4. **Install Backend Dependencies:**:

   ```bash
   cd ../backend
   npm install
   
5. **Set Up Environment Variables:**:

   ```bash
   MONGODB_URI=your_mongodb_connection_string

6. **Start the Backend Server:**:

   ```bash
   node index.js

7. **Start the Frontend Application:**:

   ```bash
   cd ../frontend
   npm run dev

8. **Open Your Browser**:

   ```bash
   Visit http://localhost:5173 to access the application.