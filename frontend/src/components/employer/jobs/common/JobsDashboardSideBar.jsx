import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../style/jobsdashboardsidebar.css";

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
        <NavLink to="/jobsdashboard" className="sidebar-link">
          <h4>
            <i className="fa-solid fa-layer-group"></i>
            <span className="sidebar-text">Overview</span>
          </h4>
        </NavLink>

        <NavLink to="/employer-profile" className="sidebar-link">
          <h4>
            <i className="fa-solid fa-user"></i>
            <span className="sidebar-text">Employers Profile</span>
          </h4>
        </NavLink>

        <NavLink to="/post-job" className="sidebar-link">
          <h4>
            <i className="fa-solid fa-plus"></i>
            <span className="sidebar-text">Post a Job</span>
          </h4>
        </NavLink>

        <NavLink to="/my-jobs" className="sidebar-link">
          <h4>
            <i className="fa-solid fa-briefcase"></i>
            <span className="sidebar-text">My Jobs</span>
          </h4>
        </NavLink>

        <NavLink to="/saved-candidates" className="sidebar-link">
          <h4>
            <i className="fa-solid fa-bookmark"></i>
            <span className="sidebar-text">Saved Candidates</span>
          </h4>
        </NavLink>

        <NavLink to="/plans-billing" className="sidebar-link">
          <h4>
            <i className="fa-solid fa-book"></i>
            <span className="sidebar-text">Plans & Billing</span>
          </h4>
        </NavLink>

        <NavLink to="/all-companies" className="sidebar-link">
          <h4>
            <i className="fa-solid fa-globe"></i>
            <span className="sidebar-text">All Companies</span>
          </h4>
        </NavLink>

        <NavLink to="/settings" className="sidebar-link">
          <h4>
            <i className="fa-solid fa-gear"></i>
            <span className="sidebar-text">Settings</span>
          </h4>
        </NavLink>

        <NavLink to="/logout" className="sidebar-link">
          <h4>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span className="sidebar-text">Log-out</span>
          </h4>
        </NavLink>
      </div>
    </>
  );
}

export default JobsDashboardSideBar;
