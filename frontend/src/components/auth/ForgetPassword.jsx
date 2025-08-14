import React, { useState } from "react";
import axios from "axios";


function ForgetPassword(){

    const[email , setEmail] =useState('');

    function handleSubmit(e){

        e.preventDefault();

        axios.post('/forgetpassword' , {

            email:email,

        })
        .then(response => {

            console.log('Code Has Been Successfully sent');

        })
        .catch(error => {

            console.log('Error' , error.response.data);

        })

    }

    return(

        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    placeholder="Write Your Email Here"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <button type="submit">Submit</button>
            </form>
        </div>

    )

}

export default ForgetPassword;