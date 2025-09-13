import React from "react";
import './style/navBar.css';

export default function NavBar(){

    return(

        <div className="home-page-nav-main-container">
            <div className="home-page-nav-first-container">
                <h4>EmployVia</h4>   
            </div>
            <div className="home-page-nav-second-container">
                <button>Sign In</button>         
                <button>Post A Job</button>
            </div>         
        </div>

    )

}