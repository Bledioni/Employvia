import React from "react";
import jobsdashboardsidebar from '../../style/jobsdashboardsidebar.css';

function JobsDashboardSideBar(){

    return(

        <div className="jobs-dashboard-side-bar-container">
            
            <h4><i class="fa-solid fa-layer-group"></i> Overview</h4>
            <h4><i class="fa-solid fa-user"></i> Employers Profile</h4>
            <h4><i class="fa-solid fa-plus"></i> Post a Job</h4>
            <h4><i class="fa-solid fa-briefcase"></i> My Jobs</h4>
            <h4><i class="fa-solid fa-bookmark"></i> Saved Candidates</h4>
            <h4><i class="fa-solid fa-book"></i> Plans & Billing</h4>
            <h4>All Companies</h4>
            <h4>Settings</h4>

        </div>

    )

}

export default JobsDashboardSideBar;