import React, { useState } from 'react';
import './Sidebar.css'; // Import the CSS file for styling

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const tabs = [
    { icon: 'fas fa-home', name: 'Dashboard' },
    { icon: 'fas fa-cube', name: 'Project' },
    { icon: 'fas fa-user', name: 'Users' },
    { icon: 'fas fa-hashtag', name: 'Roles' },
    { icon: 'fas fa-fingerprint', name: 'Permissions' },
    { icon: 'fas fa-cog', name: 'General' },
    { icon: 'fas fa-user', name: 'Profile' },
    { icon: 'fas fa-question', name: 'FAQ' },
    { icon: 'fas fa-life-ring', name: 'Support' },
  ];

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Collapse Arrow */}
      <div onClick={handleCollapse} className="collapse-icon">
        <i className={`fas fa-chevron-${isCollapsed ? 'right' : 'left'}`} />
      </div>

      {/* Tabs */}
      {tabs.map((tab, index) => (
        <div key={index} className="tab-item">
          {tab.heading && !isCollapsed ? (
            <div className="tab-heading">{tab.heading}</div>
          ) : (
            <a href='#' className='item-link'>
              <i className={tab.icon} />
              {!isCollapsed && <span>{tab.name}</span>}
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;