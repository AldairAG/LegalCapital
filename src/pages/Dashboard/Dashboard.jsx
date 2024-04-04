import React from "react";
import Sidebarv2 from "../../components/Sidebar/Sidebarv2"
import "./Dashboard.css"
import MainDiv from "../../components/Memberships/MainDiv";


const Dashboard = () => {

    return (
        <div className="layout">
            <div className="content1">
                <Sidebarv2 />
            </div>
            <div className="content2">
                <MainDiv/>
            </div>
        </div>
    )
}

export default Dashboard;