import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="fire-icon">🔥</span>
        <h1>Fire Guard</h1>
        <span className="subtitle">Smart Fire & Temperature Monitor</span>
      </div>
      <div className="navbar-status">
        <div className="status-indicator online">
          <span className="status-dot"></span>
          System Online
        </div>
      </div>
    </nav>
  );
};

export default Navbar;