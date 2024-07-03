import "./Retiros.css"
import { getDatabase, ref, get, set } from "firebase/database";
import appFirebase from "../../../firebase-config.js";
import { useEffect, useState } from "react";
import { div } from "three/examples/jsm/nodes/Nodes.js";
import { EventDispatcher } from "three";
import emailjs from '@emailjs/browser';
import PeticionesModel from "../../../model/PeticionModel.js"


const Retiros = () => {
    const [retiros, setRetiros] = useState([])

    useEffect(() => {
        fetchData()
    }, []);

    const sendEmail = (peticionData) => {
        emailjs.send("service_033kgeg", "template_rtzxfsv", {
            cantidad: peticionData.requestRetiro,
            userName: peticionData.userName,
            destinatario: peticionData.email,
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

    const aprobar = (peticionData) => {
        const peticionesModel = new PeticionesModel()
        sendEmail(peticionData)
        peticionesModel.borrar(peticionData.firebaseKey)
        fetchData()
    }

    const fetchData = async () => {
        const db = getDatabase(appFirebase);
        const dbRef = ref(db, "peticiones/");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            const peticiones = Object.values(snapshot.val());
            const peticionesFiltradas = peticiones.filter(peticion => peticion.concepto === "Retiro");
            setRetiros(peticionesFiltradas);
        } else {
            setRetiros([])
        }
    }

    const handleCopy = () => {
        const inputElement = document.getElementById("wallets");
        const range = document.createRange();
        range.selectNode(inputElement);
        window.getSelection().removeAllRanges();  // Clear any existing selections
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();  // Unselect after copying
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
                                        <span id="wallets">{item.usdtAddress}</span>
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