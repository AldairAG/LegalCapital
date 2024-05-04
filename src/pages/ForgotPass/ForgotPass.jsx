import "./ForgotPass.css"
import { useHistory } from 'react-router-dom';
import img from "../../Assets/Images/Logos/Logo_1.png"
import React, { useState } from 'react';
import appFirebase from "../../firebase-config";
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
const auth = getAuth(appFirebase)

const ForgotPass = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const history = useHistory();

    const handleResetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            setSuccess(true);
            setError(null);
            history.push('/');
        } catch (error) {
            setError(error.message);
            setSuccess(false);
        }
    };

    return (
        <section className="Fp">
            <form class="form">
                <img src={img} alt="logo" />
                <p class="login">Reset your password</p>
                <p>You will be sent an email to change your password.</p>
                <div class="inputContainer">
                    <input type="button" value="next" class="submit" onClick={handleResetPassword}/>
                    <input placeholder="enter your email" type="text" class="fInput email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
            </form>

        </section>
    );
};

export default ForgotPass