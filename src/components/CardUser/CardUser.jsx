import "./CardUser.css"
import React, { useState, useEffect } from 'react';
import img0 from "../../Assets/Images/Logos/rangos/rank-0.png"
import img1 from "../../Assets/Images/Logos/rangos/rank-1.png"
import img2 from "../../Assets/Images/Logos/rangos/rank-1.png"
import img3 from "../../Assets/Images/Logos/rangos/Rank-3.png"
import img4 from "../../Assets/Images/Logos/rangos/Rank-4.png"
import img5 from "../../Assets/Images/Logos/rangos/Rank-5.png"
import img6 from "../../Assets/Images/Logos/rangos/Rank-6.png"
import img7 from "../../Assets/Images/Logos/rangos/Rank-7.png"
import img8 from "../../Assets/Images/Logos/rangos/Rank-8.png"
import img9 from "../../Assets/Images/Logos/rangos/Rank-9.png"
import CardUserData from "./CardUserData";

const CardUser = (props) => {
    const [rango, setRango] = useState("");
    const [imgRango, setImgRango] = useState("");
    const [paquete,setPaquete]=useState("");
    const [referidos,setReferidos]=useState(0);
    const [referidosTotales,setReferidosTotales]=useState(0);


    useEffect(() => {
        calcularRango(props.userData.rank)
        calcularPaquete(props.userData.walletDiv)
        const cardUserData=new CardUserData(props.userData,setReferidos,setReferidosTotales)
    }, []);

    const calcularRango = (numero) => {
        switch (numero) {
            case 1:
                setRango("Zarifo Ejecutivo")
                setImgRango(img1)
                break
            case 2:
                setRango("Ruby Ejecutivo")
                setImgRango(img2)
                break;
            case 3:
                setRango("Esmeralda Ejecutivo")
                setImgRango(img3)
                break;
            case 4:
                setRango("Ejecutivo Diamante")
                setImgRango(img4)
                break;
            case 5:
                setRango("Diamante Azul")
                setImgRango(img5)
                break;
            case 6:
                setRango("Diamante Negro")
                setImgRango(img6)
                break;
            case 7:
                setRango("Diamante Royal")
                setImgRango(img7)
                break;
            case 8:
                setRango("Diamante Corona")
                setImgRango(img8)
                break;
            case 9:
                setRango("Diamante Royal")
                setImgRango(img9)
                break;

            default:
                setRango("No Rank")
                setImgRango(img0)
        }
    }
    const calcularPaquete = (valor) => {
        switch (true) {
            case valor <= 99:
                setPaquete("");
                break;
            case valor >= 100 && valor <= 499:
                setPaquete("Builder");
                break;
            case valor >= 500 && valor <= 2499:
                setPaquete("Bronze");
                break;
            case valor >= 2500 && valor <= 4900:
                setPaquete("Silver");
                break;
            case valor >= 5000 && valor <= 10000:
                setPaquete("Gold");
                break;
            default:
                setPaquete("Platinum");
        }
    }
    return (
        <section className="userDetail">
            <img className='rangoImg' src={imgRango} alt="rango" />
            <p className='p0'>{props.userData.userName}</p>
            <p className='p1'>{rango}</p>
            <div className="datosUser">
                <p className='p2'>Team capital: $0</p>
                <p className='p2'>fecha de activacion: {props.userData.admissionDate}</p>
                <p className='p2'>Paquete actual:{paquete}</p>
            </div>

            <div class="tablaRed">
                <div className="datosRedes">
                    <p className="titulo">My network</p>
                    <p className="datoRed">{referidos}</p>
                </div>
                <div className="datosRedes">
                    <p className="titulo">Total network</p>
                    <p className="datoRed">{referidosTotales}</p>
                </div>
            </div>
        </section>
    )
}
export default CardUser