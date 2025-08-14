import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";


function Login(){

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    function handleSubmit(e){
        
        e.preventDefault();

        axios.post('login' ,{

            email:email,
            password:password,

        })
        .then(response => {

            console.log("Login Successfully" , response.data);
            localStorage.setItem("token" , response.data.token);

        })
        .catch(error => {

            console.log("Error: " , error.data.response);

        })

    }

    return(

        <div>
        
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>

            <p>Forget Password <Link to="/forgetpassword">Reset</Link></p>

        </div>

    )

}

export default Login;