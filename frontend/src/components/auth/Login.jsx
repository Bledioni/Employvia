import axios from "axios";
import React, { use, useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import login from '../auth/style/login.css';
import staffTalking from '../../images/login/staffTalking.png';


function Login(){

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [errorMessage , setErrorMessage] = useState('');
    const navigate = useNavigate();

    function handleSubmit(e){
        
        e.preventDefault();

        axios.post('login' ,{

            email:email,
            password:password,

        })
        .then(response => {

            console.log("Login Successfully" , response.data);
            localStorage.setItem("token" , response.data.token);

            const role = response.data.user.role;

            if(role === 'employer'){

                navigate('/insertcompany');

            }

        })
        .catch(error => {
            if (error.response) {
                setErrorMessage(error.response.data.message);
                setTimeout(() => {
                    setErrorMessage('');
                }, 5000);
            } else {
                setErrorMessage("Something went wrong. Please try again.");
                setTimeout(() => {
                    setErrorMessage('');
                }, 5000);
            }
        });

    }

    return(

        <div className="login-form-main-container">
            <div className="login-form">
                <h2>Sign In</h2>
                <p>Don't have an account? <Link to="/register">Create account</Link></p>
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
                {errorMessage &&<p style={{color: '#e74c3c'}}>{errorMessage}</p>}
            <p><Link to="/forgetpassword">Forget Password</Link></p>
            </div>

            <div className="login-photo">
                <img src={staffTalking} alt="" />
            </div>

        </div>

    )

}

export default Login;