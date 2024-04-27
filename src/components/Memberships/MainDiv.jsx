import React, { useState, useEffect } from 'react';
import "./styles/MainDiv.css"
import MainDivData from "./js/MainDivData"
import CardUser from './CardUser/CardUser';

import CardData from "./CardData/CardData"
import image0 from "../../Assets/Images/Logos/retiro.png";
import image1 from "../../Assets/Images/Logos/wallet.png";

const MainDiv = (props) => {
    const [totalMN, setTotalMN] = useState(1);

    useEffect(() => {
        const userName = props.userData.userName;
        /*const mainDivData = new MainDivData(setTotalMN, setNewMN, setTotalRF, setNewRF, userName, totalMN)
        mainDivData.getDirectRef()
        mainDivData.contarTotalReferidos(userName).then(total => {
            setTotalMN(total)
        });*/
    }, [props.userData]);

    return (
        <div className="seccion-main">
            <section className='dashboard'>
                
                <div className="seccion0">
                    <h1>Vitual office</h1>
                    <i class="bi bi-house"></i>
                </div>
                <div className="seccion3"><CardData dato={props.userData.walletDiv} img={image1} type={true} typeBtn1={true} titulo="Wallet dividendos" /></div>
                <div className="seccion2"><CardData img={image0} type={true} titulo="Total withdrawals" /></div>
                <div className="seccion9"><CardData dato={props.userData.bonoRefDirect} type={false} titulo="Direct Referral Bonus" /></div>
                <div className="seccion5"><CardData dato={props.userData.bonoIngresoRes} type={false} titulo="Residual Income Fees" /></div>
                <div className="seccion6"><CardData dato={props.userData.bonoRangoRes} type={false} titulo="Residual Rank" /></div>
                <div className="seccion8"><CardData dato={props.userData.bonoIgualacion} type={false} titulo="Matching Bonus" /></div>
                <div className="seccion1"><CardData dato={props.userData.walletCom+props.userData.walletDiv} type={false} titulo="Total earnings" /></div>
                <div className="seccion4"><CardData dato={props.userData.walletCom} type={false} titulo="Commission wallet" /></div>
                <div className="seccion7">
                    <CardUser/>
                </div>
            </section>

        </div>
    )
}

export default MainDiv