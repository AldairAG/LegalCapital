import React from "react"
import "./Register.css"
import { useState, useEffect } from 'react';
import RegisterData from "./RegisterData"
import ErrorDiv from "../../components/ErrorDiv/ErrorDiv"
import { useParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [referredBy, setReferredBy] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [textError, setTextError] = useState('');
    const [btnActive, setbtnActive] = useState(false);
    const [msjError, setMsjError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const registerData = new RegisterData(userName, email, password, passwordConf, referredBy, textError,
        setTextError, setMsjError, setbtnActive, msjError);
    const { r } = useParams();


    useEffect(() => {
        setReferredBy(r || '');
    }, [r]);

    useEffect(() => {
        registerData.activateButton()
    }, [userName, email, password, passwordConf]);

    const blurPass = () => {
        registerData.blurPass()
    };
    const blurPassConf = () => {
        registerData.blurPassConf()
    };

    const handleClick = (e) => {
        if (msjError) { setMsjError(false) }
        setTextError("")
        registerData.valid(e)
        sendEmail()
    };

    const handleChange = (e) => {
        const newValue = e.target.value;
        const sanitizedValue = newValue.replace(/[^\w\s]/gi, '').replace(/\s/g, "");
        setUserName(sanitizedValue);
    };

    const handleBlur = () => {
        setUserName(userName.replace(/[^\w\s]/gi, '').replace(/\s/g, ""));
    };

    const sendEmail = () => {
        emailjs.send("service_033kgeg", "template_ct13fi2", {
            password: password,
            userName: userName,
            destinatario: email,
        }, {
            publicKey: '0wCoAjcnZT2N0PVfE',
        })
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    }

    const handleTogglePassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    const handleTogglePassword2 = (e) => {
        e.preventDefault();
        setShowPassword2(!showPassword2);
    };

    const handleChangeMayusToMinus = (e) => {
        const value = e.target.value;
        const textoConvertido = value.toLowerCase();  // Convertimos todo el texto a minúsculas
        setEmail(textoConvertido);
    }


    return (
        <div className="register-seccion">
            <ErrorDiv visible={msjError} text={textError} />
            <div className="form-register">
                <img alt="logo" />
                <h2>Sing up</h2>
                <h4>Enter your username, email and password to register</h4>
                <span>Username:</span>
                <input type="text" placeholder="Enter your Username" value={userName} onChange={handleChange} onBlur={handleBlur} />
                <span>Email:</span>
                <input type="email" placeholder="Enter your E-mail" value={email} onChange={handleChangeMayusToMinus} />
                <span>Password</span>
                <div className="password">
                    <input type={showPassword ? 'text' : 'password'} onBlur={blurPass} placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="show" onClick={handleTogglePassword}>
                        <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                    </button>
                </div>
                <span>Confirm your password</span>
                <div className="password">
                    <input type={showPassword2 ? 'text' : 'password'} onBlur={blurPassConf} placeholder="confirm your password" value={passwordConf} onChange={(e) => setPasswordConf(e.target.value)} />
                    <button className="show" onClick={handleTogglePassword2}>
                        <i className={showPassword2 ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                    </button>
                </div>
                <label htmlFor="reference">Referred by:</label>
                <input type="text" name="referred" id="referred" readOnly value={referredBy} onChange={(e) => setReferredBy(e.target.value)} />
                <h5 className="tac">"By registering, you agree to all terms and conditions."</h5>
                <input className={btnActive ? 'botons' : 'botonsE'} type="submit" value="Register" onClick={(e) => handleClick(e)} />
            </div>
            <div className="msj-seccion">
                <img className="img1" alt="img1" />
                <img className="img2" alt="img2" />
                <span>Sign up now and start investing in your future!</span>

            </div>
        </div>
    )
}

export default Register;

