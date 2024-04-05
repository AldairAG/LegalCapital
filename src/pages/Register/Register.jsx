import React from "react"
import "./Register.css"
import { useState, useEffect } from 'react';
import RegisterData from "./RegisterData"
import ErrorDiv from "../../components/ErrorDiv/ErrorDiv"

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [referredBy, setReferredBy] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [textError, setTextError] = useState('');
    const [btnActive, setbtnActive] = useState(false);
    const [msjError, setMsjError] = useState(false);
    const registerData = new RegisterData(userName, email, password,passwordConf, referredBy,textError, 
    setTextError,setMsjError,setbtnActive);

    useEffect(() => {
        registerData.activateButton()
    }, [userName, email, password, passwordConf]);
    const handleClick = (e) => {
        registerData.valid(e)
    };
    const blurPass = () => {
        registerData.blurPass()
    };
    const blurPassConf = () => {
        registerData.blurPassConf()
    };

    return (
        <div className="registerDiv">
            <ErrorDiv visible={msjError} text={textError}/>
            <div className="form-register">
                <img alt="logo"/>
                <h4>Register</h4>
                <input type="text" placeholder="Enter your Username" value={userName} onChange={(e) => setUserName(e.target.value)} />
                <input type="email" placeholder="Enter your E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" onBlur={blurPass} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" onBlur={blurPassConf} placeholder="confirm your password" value={passwordConf} onChange={(e) => setPasswordConf(e.target.value)} />
                <label htmlFor="reference">Referred by:</label>
                <input type="text" name="referred" id="referred" readOnly value={referredBy} onChange={(e) => setReferredBy(e.target.value)} />
                <input className={btnActive ? 'botons' : 'botonsE'} type="submit" value="Register" onClick={(e) => handleClick(e)} />
            </div>
        </div>
    )
}

export default Register;

