import React, { useState } from "react";
import axios from "axios";
import staffTalking from '../../images/login/staffTalking.png';
import forgetpassword from '../auth/style/forgetpassword.css';
import { Link } from "react-router-dom";
import { api } from "../../index";




function ForgetPassword(){

    const[email , setEmail] = useState('');
    const[errorMessage , setErrorMessage] = useState('');

    function handleSubmit(e){

        e.preventDefault();

        api.post('/forgetpassword' , {

            email:email,

        })
        .then(response => {

            console.log('Code Has Been Successfully sent');

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

        <div className="forgetpassword-form-main-container">
            <div className="forgetpassword-form">
                <h3>Forget Password</h3>
                <p>Go back to <Link to="/login">Sign In</Link></p>
                <p>Don't have account <Link to="/register">Create Account</Link></p>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email"
                        placeholder="Write Your Email Here"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <button type="submit">Reset Password</button>
                </form>
                {errorMessage && <p style={{color:'#e74c3c'}}>{errorMessage}</p>}
            </div>
            <div className="forgetpassword-image">
                <img src={staffTalking} alt="" />
            </div>
        </div>

    )

}

export default ForgetPassword;