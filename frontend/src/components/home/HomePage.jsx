import react from "react";
import NavBar from "./NavBar";
import FindJobApi from "./api/FindJobApi";
import FetchJobs from "./popularVacanies/FetchJobs";
import Process from "./popularVacanies/Process";


export default function HomePage(){

    return(

        <div>
            <NavBar/>
            <FindJobApi/>
            <FetchJobs />
            <Process/>
        </div>

    )

}