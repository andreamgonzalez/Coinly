import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LoginForm.css"

/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to / route
 *
 * Routes -> LoginForm -> Alert
 * Routed as /login
 */

function LoginForm({login}){
    const history = useHistory();
    const [formData, setFormData] =  useState({
        username: "",
        password: ""
    });

    const handleChange = evt => {
        const { name, value} = evt.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    };

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await login(formData);
        // if (result.success) {
            history.push("/");
        // } 
    };

    return(
        <div className="LoginForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h3 className="mb-3">Log In</h3>
                <div className="card">
                    <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="input-item">
                            <label>Username</label>
                            <input onChange={handleChange} className="form-control" type="text" name="username" value={formData.username} id="username" required/>
                        </div>
                        <div className="input-item">
                            <label>Password</label>
                            <input onChange={handleChange} className="form-control" type="password" name="password" value={formData.password} id="password" required/>
                        </div>
                        <button className="btn btn-primary btn-sm" id="loginButton" onSubmit={handleSubmit}>Log in</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;