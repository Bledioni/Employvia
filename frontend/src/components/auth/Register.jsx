import axios from "axios";
import React, { useState } from "react";
import staffTalking from '../../images/login/staffTalking.png';
import register from '../auth/style/register.css';
import { Link , useNavigate} from "react-router-dom";

function Register(){

    const navigate = useNavigate();

    const[role , setRole] = useState('');
    const[name , setName] = useState('');
    const[email , setEmail] = useState('');
    const[password , setPassword] = useState('');
    const[confirmPassword , setConfirmPassword] = useState('');
    const[errorMessage , setErrorMessage] = useState('');

    function handleSubmit(e){

        e.preventDefault();

        axios.post('api/register' ,{

            role:role,
            name:name,
            email:email,
            password:password,
            password_confirmation:confirmPassword,

        })
        .then(response => {

            console.log("Registration Succesfull" , response.data);
            navigate('/login')

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

        <div className="register-form-main-container">
                    
            <div className="register-form">
            
            <h2>Create account.</h2>
            <p>Already have account? <Link to="/login">Log In</Link></p>
            
            <form onSubmit={handleSubmit}>
                    <div className="register-form-role">
                        CREATE ACCOUNT AS
                        <div className="register-form-role-select">
                            <button type="button"
                            className={role === "user" ? "active" : ""}
                            onClick={() => setRole("user")}>Candidate
                            </button>

                            <button type="button"
                                className={role === "employer" ? "active" : ""}
                                onClick={() => setRole("employer")}>Employeer
                            </button>
                        </div>

                    </div>
                <input 
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                />
                <input 
                    type="Email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <input 
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                />
                <button type="submit">Create Account</button>
            </form>

            {errorMessage && <p style={{color:'#e74c3c'}}>{errorMessage}</p>}

            </div>
            <div className="register-form-image">
                <img src={staffTalking} alt="" />
            </div>
        </div>

    )

}

export default Register;