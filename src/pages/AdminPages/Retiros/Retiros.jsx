import "./Retiros.css"
import { getDatabase, ref, get, set } from "firebase/database";
import appFirebase from "../../../firebase-config.js";
import { useEffect, useState } from "react";
import { div } from "three/examples/jsm/nodes/Nodes.js";
import { EventDispatcher } from "three";
import emailjs from '@emailjs/browser';
import Common from "../../../components/js/Common.js"


const Retiros = () => {
    const [retiros, setRetiros] = useState([])
    const common = new Common()

    useEffect(() => {
        fetchData()
    }, []);

    const sendEmail = (userData) => {
        emailjs.send("service_033kgeg", "template_rtzxfsv", {
            cantidad: userData.requestRetiro,
            userName: userData.userName,
            destinatario: userData.email,
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

    const aprobar = (userData) => {
        sendEmail(userData)
        userData.requestRetiro = 0
        common.editAnyUser(userData)
        fetchData()
    }

    const fetchData = async () => {
        const db = getDatabase(appFirebase);
        const dbRef = ref(db, "users");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            const users = Object.values(snapshot.val());
            const filteredUsers = users.filter(user => user.requestRetiro > 0);
            setRetiros(filteredUsers);
        } else {
            alert("error");
        }
    }

    const handleCopy = () => {
        const inputElement = document.getElementById("wallet");
        inputElement.select();
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    };

    return (
        <section className="RetiroAdmin">
            <div className="tabla contenidoRetiros">
                <div className="titulo-read">
                    <p>Solicitudes de retiros</p>
                    <button className="sect2-rea" onClick={fetchData}><i class="bi bi-arrow-clockwise"></i></button></div>
                <div className="contenido-read">
                    <ul>
                        {retiros.map((item, index) => (
                            <div className="card-retiro">
                                <div className="sec1-rea">
                                    <p>Usuario: {item.userName}</p><tr />
                                    <span>{item.email}</span>
                                </div>
                                <div className="sec2-rea">
                                    <p>Cantidad:</p> <tr />
                                    <span>{item.requestRetiro}</span>
                                </div>
                                <div className="sec3-rea">
                                    <button onClick={() => aprobar(item)}>Notificar de aprobado</button>
                                </div>
                                <div className="sec4-rea">
                                    <p >Wallet address to pay:</p>
                                    <div className="wallet">
                                        <span>TMuMJUSBamBf1d2vhbd4g1p13pUf6N7TtM</span>
                                        <button onClick={handleCopy} ><i class="bi bi-copy"></i></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Retiros