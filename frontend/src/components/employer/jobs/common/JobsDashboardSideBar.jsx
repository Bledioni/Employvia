import React from "react";
import { NavLink } from "react-router-dom"; 
import "../../style/jobsdashboardsidebar.css";

function JobsDashboardSideBar() {
  return (
    <div className="jobs-dashboard-side-bar-container">
      <NavLink to="/jobsdashboard" className="sidebar-link">
        <h4><i className="fa-solid fa-layer-group"></i> Overview</h4>
      </NavLink>

      <NavLink to="/employer-profile" className="sidebar-link">
        <h4><i className="fa-solid fa-user"></i> Employers Profile</h4>
      </NavLink>

      <NavLink to="/post-job" className="sidebar-link">
        <h4><i className="fa-solid fa-plus"></i> Post a Job</h4>
      </NavLink>

      <NavLink to="/my-jobs" className="sidebar-link">
        <h4><i className="fa-solid fa-briefcase"></i> My Jobs</h4>
      </NavLink>

      <NavLink to="/saved-candidates" className="sidebar-link">
        <h4><i className="fa-solid fa-bookmark"></i> Saved Candidates</h4>
      </NavLink>

      <NavLink to="/plans-billing" className="sidebar-link">
        <h4><i className="fa-solid fa-book"></i> Plans & Billing</h4>
      </NavLink>

      <NavLink to="/all-companies" className="sidebar-link">
        <h4><i className="fa-solid fa-globe"></i> All Companies</h4>
      </NavLink>

      <NavLink to="/settings" className="sidebar-link">
        <h4><i className="fa-solid fa-gear"></i> Settings</h4>
      </NavLink>

    <NavLink to="/logout" className="sidebar-link">
        <h4><i class="fa-solid fa-arrow-right-from-bracket"></i> Log-out</h4>
      </NavLink>

    </div>
  );
}

export default JobsDashboardSideBar;
