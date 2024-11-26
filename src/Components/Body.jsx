import React, { useState } from 'react';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import Home from './Dashboard/Home/Home';

export default function Body() {
  const [selectedProject, setSelectedProject] = useState('BVM')
  const [project, setProject] = useState([]);
  const [item, setItem] = useState('Dashboard');

  const height = {
    height: '100vh',
  };


  return (
    <div style={height}>
      <Navbar project={project} setProject={setProject} setSelectedProject={setSelectedProject}/>
      <div className="body-container" style={{ display: 'flex', height: 'calc(100vh - 60px)' }}>
        <Sidebar setItem={setItem} />
        <Home item={item} setItem={setItem} project={project} setProject={setProject} style={{ flex: 1 }} />
      </div>
    </div>
  );
}