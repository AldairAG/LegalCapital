import "./CardUser.css"
import React, { useState, useEffect } from 'react';
import img0 from "../../Assets/Images/Logos/Logo_1pq.png"
import img1 from "../../Assets/Images/Logos/rangos/rank-1.png"
import img2 from "../../Assets/Images/Logos/rangos/Rank-2.png"
import img3 from "../../Assets/Images/Logos/rangos/Rank-3.png"
import img4 from "../../Assets/Images/Logos/rangos/Rank-4.png"
import img5 from "../../Assets/Images/Logos/rangos/Rank-5.png"
import img6 from "../../Assets/Images/Logos/rangos/Rank-6.png"
import img7 from "../../Assets/Images/Logos/rangos/Rank-7.png"
import img8 from "../../Assets/Images/Logos/rangos/Rank-8.png"
import img9 from "../../Assets/Images/Logos/rangos/Rank-9.png"
import appFirebase from "../../firebase-config";
import { getDatabase, ref, get } from "firebase/database";

const CardUser = (props) => {
    const [rango, setRango] = useState("");
    const [imgRango, setImgRango] = useState("");
    const [paquete, setPaquete] = useState("");
    const [users, setUsers] = useState([])
    const [referidos, setReferidos] = useState(0);
    const [referidosTotales, setReferidosTotales] = useState(0);
    const [capitalTotal, setCapitalTotal] = useState(0);

    const getUsers = async () => {
        const db = getDatabase(appFirebase);
        const dbRef = ref(db, "users/");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            const users = Object.values(snapshot.val());
            setUsers(users)
        }
    }

    useEffect(() => {
        getRedDirecta()
        const total = getRedTotal(1, props.userData.userName)
        const cap = getCap(1, props.userData.userName)
        setReferidosTotales(total)
        setCapitalTotal(cap)
    }, [users]);

    const getRedDirecta = async () => {
        const filteredUsers = users.filter(user => user.referredBy == props.userData.userName);
        setReferidos(filteredUsers.length)
    }

    const getRedTotal = (contador, userName) => {
        if (contador > 7) {
            return 0;
        }

        const filteredUsers = users.filter(user => user.referredBy === userName);
        let total = filteredUsers.length;

        for (let user of filteredUsers) {
            total += getRedTotal(contador + 1, user.userName);
        }

        return total;
    };

    const getCap = (contador, userName) => {
        if (contador > 7) {
            return 0;
        }

        const filteredUsers = users.filter(user => user.referredBy === userName);
        let totalCapital = filteredUsers.reduce((sum, user) => sum + user.staterPack, 0);
        for (let user of filteredUsers) {
            const result = getCap(contador + 1, user.userName);
            totalCapital += result;
        }

        return totalCapital;
    };

    useEffect(() => {
        getUsers()
        calcularRango(props.userData.rank)
        calcularPaquete(props.userData.staterPack)
    }, []);

    const calcularRango = (numero) => {
        switch (numero) {
            case 1:
                setRango("Zafiro Ejecutivo")
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
                setRango("Presidente Royal")
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
            <div className="sec1">
                <p>Your rank</p>
                <span>{rango}</span>
            </div>
            <div className="sec2">
                <img className='rangoImg' src={imgRango} alt="rango" />
            </div>
            <div className="sec3">
                <span>{props.userData.userName}</span>
                <p>Team capital: ${capitalTotal} <img alt="logo_usdt" /></p>
                <p>Joined on: {props.userData.admissionDate}</p>
            </div>
            <div className="sec4">
                <div className="datosRedes">
                    <p className="titulo">Direct</p>
                    <p className="datoRed">{referidos}</p>
                </div>
            </div>
            <div className="sec5">
                <div className="datosRedes">
                    <p className="titulo">Total network</p>
                    <p className="datoRed">{referidosTotales}</p>
                </div>
            </div>
        </section>
    )

}
export default CardUser