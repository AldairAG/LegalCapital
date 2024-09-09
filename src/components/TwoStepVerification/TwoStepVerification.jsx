import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import AlertMsg from '../AlertMsg/AlertMsg';
import AlertMsgError from '../AlertMsg/AlertMsgError';
import Common from '../js/Common';
import "./TwoStepVerification.css"

const TwoStepVerification = ({ userData }) => {
    const pasos = ["enviar", "escribir", "nip", "completado"]
    const [paso, setPaso] = useState(pasos[0])
    const [isLoading, setIsLoading] = useState(false)
    const [code, setCode] = useState(0)
    const [codeValid, setCodeValid] = useState(0)
    const [nip, setNip] = useState(0)
    const [visibleE, setVisibleE] = useState(false)
    const [visible, setVisible] = useState(false)
    const [msj, setMsj] = useState("")

    useEffect(() => {
        if (userData) {
            if (userData.nip) {
                setPaso(pasos[3])
            }
        }
    }, userData)

    const start = () => {
        setIsLoading(true)
        const codigo = Math.floor(100000 + Math.random() * 900000);
        setCode(codigo)
        sendEmail(codigo)
    }

    const verificarCode = () => {
        if (!codeValid) return
        if (code == codeValid) {
            setPaso(pasos[2])
        } else {
            setVisibleE(true)
            setMsj("Wrong code!")
        }
    }

    const sendEmail = (codigo) => {
        emailjs.send("service_033kgeg", "template_5faskmk", {
            code: codigo,
            from_name: userData.email// userData.email,
        }, {
            publicKey: '0wCoAjcnZT2N0PVfE',
        })
            .then(
                () => {
                    console.log('SUCCESS!');
                    setPaso(pasos[1])
                    setIsLoading(false)
                    setVisible(true)
                    setMsj("Email has been send")
                },
                (error) => {
                    setIsLoading(false)
                    setVisibleE(true)
                    setMsj("Faild to send email")
                    console.log('FAILED...', error.text);
                },
            );
    };

    const finalizar = () => {
        if (!nip) return
        const userRepo = new Common()
        const newUserData = userData
        newUserData.nip = nip
        userRepo.editAnyUser(newUserData).then(() => {
            setVisible(true)
            setMsj("Your Pin has been successfully updated")
            setPaso(pasos[3])
        }, (error) => {
            setVisibleE(true)
            setMsj("Faild to save data")
        })
    }

    return (
        <section className='TSV'>
            <AlertMsgError visible={visibleE} setVisible={setVisibleE} texto={msj} />
            <AlertMsg visible={visible} setVisible={setVisible} texto={msj} />
            <header><p className='textoG'>Two-factor authentication</p></header>
            <section className='contenido'>
                <div className='resaltado'>
                    <p>Two-factor authentication improves the security and privacy of accounts and personal data,
                        reducing the risk of identity theft or phishing.</p>
                </div>
                {isLoading ? (
                    <div className='spinner'></div>
                ) : (
                    <>
                        {paso == "enviar" && (
                            <button onClick={start}>Start</button>
                        )}
                        {paso == "completado" && (
                            <div className='completado'>
                                <p>You have completed two-step verification</p><i class="bi bi-check-circle-fill"></i>
                            </div>
                        )}
                        {renderPaso()}
                    </>
                )}
            </section>
        </section>
    );

    function renderPaso() {
        return (
            <section className='code'>
                {paso == "escribir" && (
                    <div className='inputData'>
                        <p>Enter the code that is sent to your email</p>
                        <input type="text" value={codeValid} onChange={(e) => setCodeValid(e.target.value)} />
                        <button onClick={verificarCode}>Verify</button>
                    </div>
                )}
                {paso == "nip" && (
                    <div className='inputData'>
                        <p><span>Enter a 4-digit code</span>, this code will be used to change your USDT (TRC20) wallet
                            and make virtual office withdrawals</p>
                        <input type="text" value={nip} onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,4}$/.test(value)) setNip(value)
                        }}/>
                        < button onClick={finalizar} > Finish</button>
                    </div>
                )
                }
            </section >
        )
    }
};

export default TwoStepVerification;
