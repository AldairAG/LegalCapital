import React, { useState, useEffect } from 'react';
import "./MainDiv.css"
import MainDivData from "./MainDivData"
import CardUser from '../../../components/CardUser/CardUser';
import CopiLink from "../../../components/CopiLink/CopyLink"
import Common from '../../../components/js/Common';
import CardData from "../../../components/CardData/CardData"
import image0 from "../../../Assets/Images/Logos/retiro.png";
import image1 from "../../../Assets/Images/Logos/usdt.png";
import CardPack from '../../../components/CardPack/CardPack';

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
        } else {
            setIsLoading(false);
        }
    }, [fetchCounter]);

    useEffect(() => {
    }, [props.userData]);

    return (
        <div className="seccion-main">
            {isLoading ? (
                <div class="spinner"></div>
            ) : (
                <section className='dashboard'>
                    <div className="sec0">
                        <i className="bi bi-bank"></i>
                        <span>Dashboard</span>
                    </div>
                    <div className="item-grid sec1"><CardData dato={(userData.walletDiv + userData.walletCom).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} type={false} titulo="TOTAL EARNINGS" /></div>
                    <div className="item-grid sec2"><CardData dato={userData.retiros.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} type={false} titulo="TOTAL WITHDRAWALS" /></div>
                    <div className="item-grid sec3"><CardPack dato={userData.staterPack} /></div>
                    <div className="item-grid sec4"><CardData dato={userData.walletDiv.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} type={false} titulo="DIVIDEND WALLET" /></div>
                    <div className="item-grid sec5"><CardData dato={userData.walletCom.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} type={false} titulo="COMMISSION WALLET" /></div>
                    <div className="item-grid sec6"><CardData dato={userData.bonoRangoRes.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} type={false} titulo="RESIDUAL RANK" /></div>
                    <div className="item-grid sec7"><CardData dato={userData.bonoRefDirect.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} type={false} titulo="DIRECT REFERRAL BONUS" /></div>
                    <div className="item-grid sec8"><CardData dato={userData.bonoIngresoRes.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} type={false} titulo="RESIDUAL INCOME FEES" /></div>
                    <div className="item-grid sec9"><CardData dato={userData.bonoIgualacion.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} type={false} titulo="MATCHING BONUS" /></div>
                    <div className="item-grid sec10"><CardData dato={userData.bonoFastTrack.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} type={false} titulo="FASTRACK BONUS" /></div>
                    <div className="item-grid sec12"><CopiLink username={userData.userName}/></div>
                    <div className="item-grid sec13"><img alt="promo" /></div>
                    <div className="item-grid sec14"><CardUser userData={userData} /></div>
                </section>
            )}
        </div>
    )
}

export default MainDiv;