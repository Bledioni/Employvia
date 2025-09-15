import react from "react";
import NavBar from "./NavBar";
import FindJobApi from "./api/FindJobApi";



export default function HomePage(){

    return(

        <div>
            <NavBar/>
            <FindJobApi/>
        </div>

    )

}