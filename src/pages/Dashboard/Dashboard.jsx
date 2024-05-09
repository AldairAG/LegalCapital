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

const Dashboard = () => {
    const [userData, setUserData] = useState([]);
    const common = new Common(setUserData)
    const [miniBarraLateral, setMiniBarraLateral] = useState(false);

    useEffect(() => {
        common.getUserData()
    }, []);

    return (
        <div className="layout">
            <div className="containDash">
                <div className="sidebar"><Sidebar max={miniBarraLateral}/> </div>
                <div className="cabeza"><Header setMax={setMiniBarraLateral}/></div>
                <div className="container">
                    <Aviso />
                    <div className="contentSeccion">
                        <Switch>
                            <Route path="/Dashboard/home" component={Home} />
                            <Route path="/Dashboard/packs" component={Page1} />
                            <Route path="/Dashboard/dividend" component={Page2} />
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

}
export default Dashboard;