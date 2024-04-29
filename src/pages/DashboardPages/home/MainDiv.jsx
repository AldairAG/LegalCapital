import React, { useState, useEffect } from 'react';
import "./MainDiv.css"
import MainDivData from "./MainDivData"
import CardUser from '../../../components/CardUser/CardUser';

import CardData from "../../../components/CardData/CardData"
import image0 from "../../../Assets/Images/Logos/retiro.png";
import image1 from "../../../Assets/Images/Logos/usdt.png";

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
                
                <div className="s0">
                    <h1>Vitual office</h1>
                    <i class="bi bi-house"></i>
                </div>
                <div className="item-grid s3"><CardData dato={props.userData.walletDiv} img={image1} type={true} typeBtn1={true} titulo="Wallet dividendos" /></div>
                <div className="item-grid s2"><CardData img={image0} type={true} titulo="Total withdrawals" /></div>
                <div className="item-grid s6"><CardData dato={props.userData.bonoRefDirect} type={false} titulo="Direct Referral Bonus" /></div>
                <div className="item-grid s8"><CardData dato={props.userData.bonoIngresoRes} type={false} titulo="Residual Income Fees" /></div>
                <div className="item-grid s5"><CardData dato={props.userData.bonoRangoRes} type={false} titulo="Residual Rank" /></div>
                <div className="item-grid s9"><CardData dato={props.userData.bonoIgualacion} type={false} titulo="Matching Bonus" /></div>
                <div className="item-grid s1"><CardData dato={props.userData.walletCom+props.userData.walletDiv} type={false} titulo="Total earnings" /></div>
                <div className="item-grid s4"><CardData dato={props.userData.walletCom} type={false} titulo="Commission wallet" /></div>
                <div className="item-grid s7"><CardUser userData={props.userData}/></div>
                <h />
            </section>

        </div>
    )
}

export default MainDiv