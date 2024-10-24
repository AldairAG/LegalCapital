import Anuncio from '../../components/Anuncio/Anuncio';
import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar"
import "./Dashboard.css"
import MainDiv from "../DashboardPages/home/MainDiv.jsx";
import Packs from "../DashboardPages/Packs/Packs.jsx"
import Common from "../../components/js/Common";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Aviso from '../../components/Aviso/Aviso.jsx';
import Header from "../../components/header/Header.jsx";
import Dividendos from "../DashboardPages/Dividendos/Dividendos.jsx";
import Red from "../DashboardPages/Red/Red.jsx";
import MyRed from "../DashboardPages/MyRed/MyRed.jsx";
import Mantenimiento from "../../components/Mantemiento/Mantenimiento.jsx";
//import Ecomerce from "../../components/Ecomerce/Ecomerce.jsx";
import Ecomerce from "../DashboardPages/Ecomerce/Ecomerce.jsx"
import Support from "../DashboardPages/Support/Support.jsx";
import UserPerfil from "../DashboardPages/UserPerfil/UserPerfil.jsx";
import Retiros from "../DashboardPages/Retiros/Retiros.jsx";
import Tools from "../DashboardPages/Tools/Tools.jsx";
import Anuncio2 from '../../components/Anuncio2/Anuncio2.jsx';
import PagarFacturas from '../DashboardPages/PagarFacturas/PagarFacturas.jsx';
import TransferenciasInternas from '../DashboardPages/TransferenciaInterna/TransferenciaInterna.jsx';


const Dashboard = () => {
    const [userData, setUserData] = useState([]);
    const common = new Common(setUserData)
    const [miniBarraLateral, setMiniBarraLateral] = useState(true);

    useEffect(() => {
        common.getUserData()
        //setUserData(common.getUserDataR)
    }, []);

    return (
        <div className="layout">
            <div className={miniBarraLateral ? "containDash" : "containDash"}>
                <div className={miniBarraLateral ? "sidebar" : "sidebar2"}><Sidebar max={miniBarraLateral} /> </div>
                <div className="cabeza"><Header setMax={setMiniBarraLateral} /></div>
                <div className="container">
                    <Aviso val={userData["validity"]} />
                    <Anuncio />
                    <Anuncio2 val={userData["validity"]} />
                    <div className="contentSeccion">
                        <Switch>
                            <Route path="/Dashboard/home" component={Home} />
                            <Route path="/Dashboard/packs" component={Page1} />
                            <Route path="/Dashboard/benefits" component={Page2} />
                            <Route path="/Dashboard/My-net-genealogy" component={Page3} />
                            <Route path="/Dashboard/My-net" component={Page4} />
                            <Route path="/Dashboard/cooming-soon" component={Page5} />
                            <Route path="/Dashboard/E-comerce" component={Page9} />
                            <Route path="/Dashboard/Support" component={Page6} />
                            <Route path="/Dashboard/Profile" component={Page7} />
                            <Route path="/Dashboard/withdrawals" component={Page8} />
                            <Route path="/Dashboard/bill-payment" component={Page10} />
                            <Route path="/Dashboard/internal-transfers" component={Page11} />
                        </Switch>
                    </div>
                </div>
                <div className='footer'><p>© 2024 Legal Capital Corp.</p></div>
            </div>
        </div>
    )

    function Home() {
        return (
            <>
                <MainDiv userData={userData} />
            </>
        );
    }
    function Page1() {
        return (
            <>
                <Packs />
            </>
        );
    }
    function Page9() {
        return (
            <>
                <Ecomerce keyF={userData.firebaseKey} />
            </>
        );
    }

    function Page10() {
        return (
            <>
                <PagarFacturas keyF={userData.firebaseKey} />
            </>
        );
    }

    function Page11() {
        return (
            <>
                <TransferenciasInternas keyF={userData.firebaseKey} />
            </>
        );
    }

    function Page2() {
        return (
            <>
                <Dividendos userName={userData.userName} />
            </>
        );
    }
    function Page3() {
        return (
            <>
                <Red userName={userData.userName} />
            </>
        );
    }
    function Page4() {
        return (
            <>
                <MyRed userName={userData.userName} />
            </>
        );
    }
    function Page6() {
        return (
            <>
                <Support userName={userData.userName} email={userData.email} />
            </>
        );
    }
    function Page7() {
        return (
            <>
                <UserPerfil keyF={userData.firebaseKey} />
            </>
        );
    }
    function Page5() {
        return (
            <>
                <Tools />
            </>
        );
    }
    function Page8() {
        return (
            <>
                <Retiros keyF={userData.firebaseKey} />
            </>
        );
    }
}
export default Dashboard;