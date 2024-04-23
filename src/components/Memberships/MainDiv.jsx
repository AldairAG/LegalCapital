import React, { useState, useEffect } from 'react';
import "./styles/MainDiv.css"
import MainDivData from "./js/MainDivData"
import Aviso from './Aviso/Aviso';
import CardData from "./CardData/CardData"
import image1 from "../../Assets/Images/Logos/ganancia.png";

const MainDiv = (props) => {
    const [totalMN, setTotalMN] = useState(1);
    const [newMN, setNewMN] = useState(0);
    const [totalRF, setTotalRF] = useState(0);
    const [newRF, setNewRF] = useState(0);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const userName = props.userData.userName;
        const mainDivData = new MainDivData(setTotalMN, setNewMN, setTotalRF, setNewRF, userName, totalMN)
        mainDivData.getDirectRef()
        mainDivData.contarTotalReferidos(userName).then(total => {
            setTotalMN(total)
        });
    }, [props.userData]);

    return (
        <div className="seccion-main">
            <section className='dashboard'>
                <Aviso />
                <div className="seccion1"><CardData type={true} titulo="Wallet"/></div>
                <div className="seccion2"><CardData type={false} image={image1} titulo="Comision wallet"/></div>
                
                <div className="seccion4">a</div>
            </section>

        </div>
    )
}

export default MainDiv