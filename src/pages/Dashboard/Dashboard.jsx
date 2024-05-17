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
import Ecomerce from "../../components/Ecomerce/Ecomerce.jsx";

const Dashboard = () => {
    const [userData, setUserData] = useState([]);
    const common = new Common(setUserData)
    const [miniBarraLateral, setMiniBarraLateral] = useState(false);

    useEffect(() => {
        common.getUserData()
    }, []);

    return (
        <div className="layout">
            <div className={miniBarraLateral ? "containDash" : "containDash"}>
                <div className={miniBarraLateral ? "sidebar" : "sidebar2"}><Sidebar max={miniBarraLateral}/> </div>
                <div className="cabeza"><Header setMax={setMiniBarraLateral}/></div>
                <div className="container">
                    <Aviso />
                    <div className="contentSeccion">
                        <Switch>
                            <Route path="/Dashboard/home" component={Home} />
                            <Route path="/Dashboard/packs" component={Page1} />
                            <Route path="/Dashboard/benefits" component={Page2} />
                            <Route path="/Dashboard/My-net-genealogy" component={Page3} />
                            <Route path="/Dashboard/My-net" component={Page5} />
                            <Route path="/Dashboard/cooming-soon" component={Page5} />
                            <Route path="/Dashboard/E-comerce" component={Ecomerce} />
                        </Switch>
                    </div>
                </div>
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
    function Page2() {
        return (
            <>
                <Dividendos userName={userData.userName}/>
            </>
        );
    }
    function Page3() {
        return (
            <>
                <Red userName={userData.userName}/>
            </>
        );
    }
    function Page4() {
        return (
            <>
                <MyRed userName={userData.userName}/>
            </>
        );
    }
    function Page5() {
        return (
            <>
                <Mantenimiento/>
            </>
        );
    }
}
export default Dashboard;