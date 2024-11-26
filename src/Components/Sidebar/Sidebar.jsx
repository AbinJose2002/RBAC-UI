import React, { useState } from 'react';
import './Sidebar.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
  const [selectedValue, setSelectedValue] = useState('Dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const tabs = [
    { icon: 'fas fa-home', name: 'Dashboard', link: 'dashboard' },
    { icon: 'fas fa-cube', name: 'Project', link: 'project' },
    { icon: 'fas fa-user', name: 'Users', link: 'users' },
    { icon: 'fas fa-hashtag', name: 'Roles', link: 'roles' },
    { icon: 'fas fa-fingerprint', name: 'Permissions', link: 'permissions' }, // Fixed typo
    { icon: 'fas fa-cog', name: 'General', link: 'general' },
    { icon: 'fas fa-user', name: 'Profile', link: 'profile' },
    { icon: 'fas fa-question', name: 'FAQ', link: 'faq' },
    { icon: 'fas fa-life-ring', name: 'Support', link: 'support' },
  ];

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleItemSelect = (index) => {
    try {
      props.setItem(tabs[index].name);
      setSelectedValue(tabs[index].name);
    } catch (error) {
      console.error("Error selecting item:", error);
    }
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} aria-label="Sidebar Navigation">
      <div onClick={handleCollapse} className="collapse-icon" role="button" aria-label="Toggle Sidebar">
        <i className={`fas fa-chevron-${isCollapsed ? 'right' : 'left'}`} />
      </div>

      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`tab-item ${selectedValue === tab.name ? 'active' : ''}`}
          onClick={() => handleItemSelect(index)}
        >
          <Link to={`/${tab.link}`} className="item-link">
            <i className={tab.icon} />
            {!isCollapsed && <span>{tab.name}</span>}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;