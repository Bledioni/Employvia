import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import login from './style/login.css';
import staffTalking from '../../images/login/staffTalking.png';


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

        <div className="login-form-main-container">
        
            <div className="login-form">
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
            <p><Link to="/forgetpassword">Forget Password</Link></p>
            </div>

            <div className="login-photo">
                <img src={staffTalking} alt="" />
            </div>

        </div>

    )

}

export default Login;