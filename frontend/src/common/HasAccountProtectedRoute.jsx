import react from "react";

function HasAccountProtectedRoute(){

    const userId = localStorage.getItem('user_id');

    console.log(userId);
    

}

export default HasAccountProtectedRoute;