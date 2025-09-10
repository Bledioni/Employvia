import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../../components/employer/style/jobsdashboardsidebar.css";

function JobsDashboardSideBar() {
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <>
      {/* Hamburger button (only visible on mobile) */}
      <button
        className="hamburger-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      {/* Sidebar */}
      <div className={`jobs-dashboard-side-bar-container ${isOpen ? "open" : ""}`}>
        <NavLink to="/user-jobs" className="sidebar-link">
          <h4>
            <i className="fa-solid fa-layer-group"></i>
            <span className="sidebar-text">Overview</span>
          </h4>
        </NavLink>

        <NavLink to="/employer-profile" className="sidebar-link">
          <h4>
            <i className="fa-solid fa-briefcase"></i>
            <span className="sidebar-text">Applied Jobs</span>
          </h4>
        </NavLink>

        <NavLink to="/post-job" className="sidebar-link">
          <h4>
            <i className="fa-solid fa-bookmark"></i>
            <span className="sidebar-text">Favorite Jobs</span>
          </h4>
        </NavLink>

        <NavLink to="/my-jobs" className="sidebar-link">
          <h4>
            <i class="fa-solid fa-bell"></i>
            <span className="sidebar-text">Job Alert</span>
          </h4>
        </NavLink>
        <NavLink to="/ai-chat" className="sidebar-link">
          <h4>
            <i class="fa-solid fa-headset"></i>
            <span className="sidebar-text">Chat</span>
          </h4>
        </NavLink>

        <NavLink to="/saved-candidates" className="sidebar-link">
          <h4>
            <i className="fa-solid fa-gear"></i>
            <span className="sidebar-text">Settings</span>
          </h4>
        </NavLink>
        
      </div>
    </>
  );
}

export default JobsDashboardSideBar;
