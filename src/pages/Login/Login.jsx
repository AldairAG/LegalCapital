import React from "react";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import "./login.css";
import LoginData from "./LoginData.js"
import ErrorDiv from "../../components/ErrorDiv/ErrorDiv.jsx"
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [textError, setTextError] = useState('');
    const [displayError, setDisplayError] = useState(false);
    const history = useHistory();
    const loginData = new LoginData(email, password,
        setTextError, setDisplayError, history);
    const username = 'pp';

    const handleLogin = async (e) => {
        loginData.functAutentication(e)
        if (displayError) { setDisplayError(false) }
    }
    const handleTogglePassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-seccion">
            <ErrorDiv visible={displayError} text={textError} />
            <div className="login-main-box">
                <div className="login-box">
                    <img alt="logo" />
                    <div className="lg">
                        <hr />
                        <span>sing in</span>
                        <hr />
                    </div>

                    <form>
                        <label htmlFor="username">Username</label>
                        <input type="text" placeholder="Enter Username" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="password">Password</label>
                        <div className="password">
                            <input type={showPassword ? 'text' : 'password'} placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button className="show" onClick={handleTogglePassword}>
                                <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                            </button>
                        </div>
                        <input type="submit" value="LogIn" onClick={(e) => handleLogin(e)} />
                        <Link to={`/recovery_password`}><p className="fyp">Forgot your password?</p></Link>
                    </form>
                </div>
                <img className="imagen" alt="img1" />
            </div>
        </div>
    )
}

export default Login;