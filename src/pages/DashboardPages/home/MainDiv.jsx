import React, { useState, useEffect } from 'react';
import "./MainDiv.css"
import MainDivData from "./MainDivData"
import CardUser from '../../../components/CardUser/CardUser';
import CopiLink from "../../../components/CopiLink/CopyLink"
import Common from '../../../components/js/Common';
import CardData from "../../../components/CardData/CardData"
import image0 from "../../../Assets/Images/Logos/retiro.png";
import image1 from "../../../Assets/Images/Logos/usdt.png";

const MainDiv = (props) => {
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchCounter, setFetchCounter] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const common = new Common(setUserData);
            await common.getUserData();
            setFetchCounter(fetchCounter + 1);
        };

        if (fetchCounter < 2) {
            fetchData();
        }else{
            setIsLoading(false);
        }
    }, [fetchCounter]);

    useEffect(() => {
    }, [props.userData]);

    return (
        <div className="seccion-main">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
            <section className='dashboard'>
                <div className="sec0">
                    <h1>VIRTUAL OFFICE</h1>
                    <i className="bi bi-house"></i>
                </div>
                <div className="item-grid sec1"><CopiLink username={userData.userName} /></div>
                <div className="item-grid sec2"><CardData dato={(userData.walletDiv+userData.walletCom).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} type={false} titulo="TOTAL EARNINGS" /></div>
                <div className="item-grid sec3"><CardData dato={userData.totalWithdrawals} type={false} titulo="TOTAL WITHDRAWALS" /></div>
                <div className="item-grid sec4"><CardData dato={userData.walletDiv.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} type={false} titulo="WALLET DIVIDENDOS" /></div>
                <div className="item-grid sec5"><CardData dato={userData.walletCom.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} type={false} titulo="COMMISSION WALLET" /></div>
                <div className="item-grid sec6"><CardData dato={userData.bonoRangoRes.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} type={false} titulo="RESIDUAL RANK" /></div>
                <div className="item-grid sec7"><CardData dato={userData.bonoRefDirect.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} type={false} titulo="DIRECT REFERRAL BONUS" /></div>
                <div className="item-grid sec8"><CardData dato={userData.bonoIngresoRes.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} type={false} titulo="RESIDUAL INCOME FEES" /></div>
                <div className="item-grid sec9"><CardData dato={userData.bonoIgualacion.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} type={false} titulo="MATCHING BONUS" /></div>
                <div className="item-grid sec10"><CardData dato={userData.bonoFastTrack.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} type={false} titulo="FASTRACK BONUS" /></div>
                <div className="item-grid sec12"><CardData dato={userData.matchingBonus2} type={false} titulo="MATCHING BONUS" /></div>
                <div className="item-grid sec13"><img alt="promo" /></div>
                <div className="item-grid sec14"><CardUser userData={props.userData} /></div>

            </section>
            )}
        </div>
    )
    /*
                <div className="item-grid s2"><CardData dato={(props.userData.walletDiv + props.userData.walletCom).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} type={false} titulo="TOTAL EARNINGS" /></div>
                <div className="item-grid s8"><CardUser userData={props.userData} /></div>
                <div className="item-grid s4"><CardData dato={walletDiv} img={image1} type={true} typeBtn1={true} titulo="WALLET DIVIDENDOS" /></div>
                <div className="item-grid s5"><CardData dato={walletCom} type={false} titulo="COMMISSION WALLET" /></div>
                <div className="item-grid s6"><CardData dato={props.userData.bonoRangoRes} type={false} titulo="RESIDUAL RANK" /></div>
                <div className="item-grid s7"><CardData dato={directRef} type={false} titulo="DIRECT REFERRAL BONUS" /></div>
                <div className="item-grid s9"><CardData dato={props.userData.bonoIngresoRes} type={false} titulo="RESIDUAL INCOME FEES" /></div>
                <div className="item-grid s10"><CardData dato={props.userData.bonoIgualacion} type={false} titulo="MATCHING BONUS" /></div>
                <div className="item-grid s11"><CardData dato={props.userData.bonoIgualacion} type={false} titulo="MATCHING BONUS" /></div>
    */
}

export default MainDiv;