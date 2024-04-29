import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar"
import "./Dashboard.css"
import MainDiv from "../DashboardPages/home/MainDiv.jsx";
import Packs from "../DashboardPages/Packs/Packs.jsx"
import Common from "../../components/js/Common";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Aviso from '../../components/Aviso/Aviso.jsx';


const Dashboard = () => {
    const [userData, setUserData] = useState([]);
    const common = new Common(setUserData)

    useEffect(() => {
        common.getUserData()
    }, []);

    return (
        <div className="layout">
            <header>
                <img className="logo" alt="logo" />
            </header>
            <section className="seccion-main">
                <div className="content1">
                    <Sidebar />
                </div>
                <div className="content2">
                    <Aviso />
                    <div className="contentSeccion">
                        <Switch>
                            <Route path="/Dashboard/home" component={Home} />
                            <Route path="/Dashboard/packs" component={Page1} />
                        </Switch>
                    </div>
                </div>

            </section>
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

}
export default Dashboard;