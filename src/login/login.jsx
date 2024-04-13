import React from 'react';
import './login.css';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export function Login() {
    const navigate = useNavigate();

    const [username, getUsername] = useState('')
    const [password, getPassword] = useState('')
    const [errorMsg, updateError] = useState('')

    async function checkLogin() {
        if (username === "" || password === "") {
            updateError('Username or Password is Incorrect')
            return false;
        }

        let postInformation;
        postInformation = {username: username, password: password};
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(postInformation)
        });

        if (response.ok) {
            const responseData = await response.json();
            localStorage.setItem("username", responseData['username']);
            navigate('/home')
        } else {
            updateError('Username or Password is Incorrect');
            return false;
        }
    }

    return (
        <main>
          <div className="seperator"></div>
            <div className="_flexbox">
                <div className="container">
                    <div className="form">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" placeholder="Username" onChange={(e) => getUsername(e.target.value)} />
    
                        <label htmlFor="password">Password</label>
                        <input type="text" id="password" placeholder="Password" onChange={(e) => getPassword(e.target.value)} />
    
                        <button className="accent-button" onClick={checkLogin}>Login</button>
                    </div>
                    <div className="error-statement"><p>{errorMsg}</p></div>
                </div>
                <div id="world-img" className="login-img"><img src="missionary-globe.png" alt="globe-icon"/></div>
            </div>
        </main>
      );
    
}