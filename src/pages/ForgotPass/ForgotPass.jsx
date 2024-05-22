import "./ForgotPass.css"
import { useHistory } from 'react-router-dom';
import img from "../../Assets/Images/Logos/Logo_1.png"
import React, { useState } from 'react';
import appFirebase from "../../firebase-config";
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import WelcomeEmail from "../Register/WelcomeEmail";
import { ArrayElementNode } from "three/examples/jsm/nodes/Nodes.js";
const auth = getAuth(appFirebase)

const ForgotPass = () => {
    const [email, setEmail] = useState('');
    const [estado, setEstado] = useState(0)
    const [code, setCode] = useState(1)
    const history = useHistory();

    const handleResetPassword = async () => {
        const number = Math.floor(100000 + Math.random() * 900000);
        const welcomeEmail = new WelcomeEmail(email, number)
        welcomeEmail.sendEmail()
    };

    const handleEstado = async () => {

    }

    const handleChange = async () => {

    }

    const content = [
        <form class="form">
            <img src={img} alt="logo" />
            <p class="login">Reset your password</p>
            <p>You will be sent an email with a code.</p>
            <div class="inputContainer">
                <input className="next" type="button" value="next" class="submit" onClick={handleResetPassword} />
                <input type="button" value="Send code" class="submit" onClick={handleResetPassword} />
                <input placeholder="enter your email" type="text" class="fInput email" onChange={(e) => setEmail(e.target.value)} />
            </div>
        </form>,

        <form class="form">
            <img src={img} alt="logo" />
            <p class="login">Reset your password</p>
            <p className="p2">Chosse a new password</p>
            <div class="inputContainer2">
            <input placeholder="enter your email" type="text" class="fInput2 email" onChange={(e) => setEmail(e.target.value)} />
                <input className="next" type="button" value="next" class="submit" onClick={handleChange} />
                <p className="p2">Chosse a new password</p>
                <input placeholder="enter your email" type="text" class="fInput2 email" onChange={(e) => setEmail(e.target.value)} />
            </div>
        </form>
    ]


    return (
        <section className="Fp">
            {content[1]}
        </section>
    );


};

export default ForgotPass