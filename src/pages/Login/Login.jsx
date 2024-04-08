import React from "react";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import "./login.css";
import LoginData from "./LoginData.js"
import ErrorDiv from "../../components/ErrorDiv/ErrorDiv.jsx"
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [textError,setTextError]=useState('');
    const [displayError,setDisplayError]=useState(false);
    const history = useHistory();
    const loginData=new LoginData(email,password,
        setTextError,setDisplayError,history);
        const username = 'mariaalvarez';

    const handleLogin = async (e) => {
        loginData.functAutentication(e)
    }

    return (
        <div className="loginDiv">
            <ErrorDiv visible={displayError} text={textError}/>
            <div className="login-box">
                <img alt="logo"/>
                <h1>Login Here</h1>
                <form>
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="Enter Username" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="submit" value="LogIn" onClick={(e) => handleLogin(e)}/>
                    <Link to={`/register/${username}`}>aaaaaaaaaaaaa</Link>
                </form>
            </div>
        </div>
    )
    //
}

export default Login;