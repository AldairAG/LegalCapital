import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar"
import "./Dashboard.css"
import MainDiv from "../../components/Memberships/MainDiv";
import Common from "../../components/js/Common";
import { useState, useEffect } from 'react';


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
                    <Sidebar/>
                </div>
                <div className="content2">
                    <MainDiv userData={userData} />
                </div>
            </section>

        </div>
    )

}

export default Dashboard;