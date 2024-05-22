import "./ForgotPass.css"
import img from "../../Assets/Images/Logos/Logo_1.png"
import React, { useState } from 'react';
import appFirebase from "../../firebase-config";
import WelcomeEmail from "../Register/WelcomeEmail";
import { useHistory, useLocation } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Common from "../../components/js/Common"
const auth = getAuth(appFirebase)

const ForgotPass = () => {
    const [email, setEmail] = useState('');
    const [estado, setEstado] = useState(0)
    const [code, setCode] = useState("")
    const [code2, setCode2] = useState("")
    const history = useHistory();
    const [error, setError] = useState("")
    const [error1, setError1] = useState("")
    const [error2, setError2] = useState("")
    const [pass, setPass] = useState("")
    const [pass2, setPass2] = useState("")
    const [user,setUser]=useState([])

    const sendCode = () => {
        const number = Math.floor(100000 + Math.random() * 900000);
        setCode(number)
        const welcomeEmail = new WelcomeEmail(email, number)
        welcomeEmail.sendEmail()
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        const common=new Common(setUser)
        common.getUserDataR(email)
        await signInWithEmailAndPassword(auth, email, user.password);
        
    };

    const handleChange = async () => {
        if (!email) {
            setError1("Please enter your email")
        } else {
            setError1("")
            setEstado(estado + 1)
            sendCode()
        }

    }
    const handleVerify = async (e) => {
        if (pass !== pass2) {
            setError1("Passwords do not match")
            setError2("Passwords do not match")
        } else if (pass.length < 6) {
            setError1("Password must contain at least 6 characters")
            setError2("")
        } else {
            setError1("")
            setError2("")
            handlePasswordReset(e)
        }
    }
    const handleVerifyCode = () => {
        if (code == code2) {
            setEstado(estado + 1)
            setError1("")
        } else {
            setError1("The code do not match")
        }
    }

    const content = [
        <form class="form">
            <img src={img} alt="logo" />
            <p class="login">Reset your password</p>
            <p>You will be sent an email with a code.</p>
            <div class="inputContainer">
                <input type="button" value="Send code" className="submit" onClick={handleChange} />
                <p className="error">{error1}</p>
                <input value={email} placeholder="enter your email" type="text" className="fInput email" onChange={(e) => setEmail(e.target.value)} />
            </div>
        </form>,

        <form class="form">
            <img src={img} alt="logo" />
            <p class="login">Reset your password</p>
            <p>Enter the code sent to your email.</p>
            <div class="inputContainer">
                <input type="button" value="Send code" className="submit" onClick={handleVerifyCode} />
                <p className="error">{error1}</p>
                <input value={code2} placeholder="enter the code" type="text" className="fInput email" onChange={(e) => setCode2(e.target.value)} />
            </div>
        </form>,

        <form class="form">
            <img src={img} alt="logo" />
            <p class="login">Reset your password</p>
            <p className="p2">Chosse a new password</p>
            <div class="inputContainer2">
                <p className="error">{error1}</p>
                <input placeholder="Enter your password" value={pass} type="password" class="fInput2 email" onChange={(e) => setPass(e.target.value)} />
                <p className="p2">Chosse a new password</p>
                <p className="error">{error2}</p>
                <input placeholder="Confirm your email" value={pass2} type="password" class="fInput2 email" onChange={(e) => setPass2(e.target.value)} />
                <input className="end" type="button" value="next" onClick={(e)=>handleVerify(e)} />
            </div>

        </form>
    ]


    return (
        <section className="Fp">
            {content[2]}
        </section>
    );


};

export default ForgotPass