import React, { useState, useEffect } from 'react';
import "./styles/MainDiv.css"
import MainDivData from "./js/MainDivData"

import CardData from "./CardData/CardData"
import image0 from "../../Assets/Images/Logos/retiro.png";
import image1 from "../../Assets/Images/Logos/wallet.png";

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
                
                <div className="seccion0">
                    <h1>Vitual office</h1>
                    <i class="bi bi-house"></i>
                </div>
                <div className="seccion1"><CardData img={image1} type={true} typeBtn1={true} titulo="Wallet dividendos" /></div>
                <div className="seccion2"><CardData img={image0} type={true} typeBtn2={true} titulo="Total whitdrwas" /></div>
                <div className="seccion3"><CardData type={false} titulo="Direct Referral Bonus" /></div>
                <div className="seccion4"><CardData type={false} titulo="Residual Income Fees" /></div>
                <div className="seccion5"><CardData type={false} titulo="Residual Rank" /></div>
                <div className="seccion6"><CardData type={false} titulo="Matching Bonus" /></div>
                <div className="seccion7">
                    <div className="userDetail">
                        <img className='rangoImg' alt="rango" />
                        <p className='p0'>UserName</p>
                        <p className='p1'>No rank</p>
                        <div className="datosUser">
                            <p className='p2'>Team capital: $0</p>
                            <p className='p2'>fecha de activacion: 24/24/2222</p>
                            <p className='p2'>Paquete actual:</p>
                        </div>
                        <div class="tablaRed">
                            <div class="fila">
                                <div class="celda">total red</div>
                                <div class="celda">Mis referidos</div>
                            </div>
                            <div class="fila">
                                <div class="celda">0</div>
                                <div class="celda">0</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default MainDiv